import {
db,
doc,
getDoc,
setDoc,
updateDoc,
increment,
collection,
addDoc,
query,
orderBy,
onSnapshot,
serverTimestamp
} from "./firebase.js";


// ===============================
// GET CONTENT ID
// ===============================

const body = document.body;

const contentId =
body.dataset.story ||
body.dataset.poetry ||
body.dataset.book;


const pageType =
body.dataset.story ? "stories" :
body.dataset.poetry ? "poetry" :
body.dataset.book ? "books" :
"stories";


// ===============================
// VISITOR COUNTER
// ===============================

async function visitorCounter(){

const ref = doc(db,"visitors","total");

const snap = await getDoc(ref);


if(!snap.exists()){

await setDoc(ref,{
count:1
});

}
else{

await updateDoc(ref,{
count:increment(1)
});

}

}


visitorCounter();



// ===============================
// VIEWS SYSTEM
// ===============================

async function addView(){

if(!contentId) return;


const ref = doc(
db,
pageType,
contentId
);


const viewed =
localStorage.getItem(
"viewed_"+contentId
);


if(!viewed){

await setDoc(
ref,
{
views:increment(1)
},
{
merge:true
}
);


localStorage.setItem(
"viewed_"+contentId,
"yes"
);

}



const snap =
await getDoc(ref);


if(
snap.exists() &&
document.getElementById("view-count")
){

document.getElementById("view-count")
.innerText =
snap.data().views || 0;

}


}


addView();




// ===============================
// LOAD VIEWS + LIKES
// ===============================


async function loadStats(){

if(!contentId) return;


const ref =
doc(db,pageType,contentId);


const snap =
await getDoc(ref);



if(snap.exists()){


const data=snap.data();


const likes =
document.getElementById("like-count");


const views =
document.getElementById("view-count");



if(likes)
likes.innerText=data.likes || 0;


if(views)
views.innerText=data.views || 0;


}



}


loadStats();




// ===============================
// LIKE SYSTEM
// ===============================


const likeBtn =
document.getElementById("like-btn");


if(likeBtn){


likeBtn.onclick = async ()=>{


const liked =
localStorage.getItem(
"liked_"+contentId
);



if(liked){

alert("آپ پہلے ہی Like کر چکے ہیں ❤️");
return;

}



const ref =
doc(db,pageType,contentId);



await setDoc(
ref,
{
likes:increment(1)
},
{
merge:true
}
);



localStorage.setItem(
"liked_"+contentId,
"yes"
);



loadStats();


};



}



// ===============================
// COMMENTS SYSTEM
// ===============================


const commentForm =
document.getElementById("comment-form");


const commentBox =
document.getElementById("comments");



if(commentForm){


commentForm.addEventListener(
"submit",
async(e)=>{


e.preventDefault();


const name =
document.getElementById("comment-name").value;


const text =
document.getElementById("comment-text").value;



await addDoc(

collection(
db,
pageType,
contentId,
"comments"
),

{

name:name,
text:text,
time:serverTimestamp()

}

);



commentForm.reset();



});


}




// LOAD COMMENTS


if(commentBox){


const commentsRef =
collection(
db,
pageType,
contentId,
"comments"
);



const q =
query(
commentsRef,
orderBy("time","desc")
);



onSnapshot(
q,
(snapshot)=>{


commentBox.innerHTML="";



snapshot.forEach(
(doc)=>{


const c=doc.data();



commentBox.innerHTML += `

<div class="comment">

<h4>${c.name || "Anonymous"}</h4>

<p>${c.text}</p>

</div>

`;



});


});


}



// const  list = document.querySelector("ul");
// const form = document.querySelector("form");
// const unSubBtn = document.querySelector(".unSub");

// //Add recipie in  UI 
// const addRecipe = (recipe, id) => {

//     let time = recipe.created_time.toDate();
//     let html = `
//     <li  data-id="${id}">
//         <div>${recipe.title}</div>
//         <div>${time}</div>
//         <button class="btn btn-danger btn-sm  my-2">Delete</button>
//     </li>
//     `
//     list.innerHTML += html;
// }


// // delete recipe from UI 
// const deleteRecipe = (id) => {
//     const recipes = document.querySelectorAll("li");
//     console.log(recipes);
    
//     recipes.forEach(recipe => {
//         console.log(3434);
//         if(recipe.getAttribute("data-id") === id){
//             recipe.remove();
//         }


//     })
    

// }


// /************   Real time listener  ***************/

//   const unsub = db.collection("recipes").onSnapshot(snap => {
//         snap.docChanges().forEach(change => {
//             const doc = change.doc;
//             if(change.type === "added" ){
//                 console.log("aaa");
//                 addRecipe(doc.data(), doc.id); 
//             }else if(change.type === "removed"){
//                 deleteRecipe(doc.id);

//             }
//         }); 
//     })



//     // GET coduments from collectons
//     // db.collection("recipes").get().then((snapshot) => {
//     //     console.log(snapshot.docs);
//     //     snapshot.docs.forEach((doc) => {
//     //         addRecipe(doc.data(), doc.id);

//     //     })

//     // }).catch((err) => {
//     //     console.log(err);
//     // })

//     // real time listeners 
    




// // Add recipe in firestore 
// form.addEventListener("submit", e => {
//     e.preventDefault();

//     const now = new Date();
//     const recipe = {
//         title: form.recipe.value,
//         created_time: firebase.firestore.Timestamp.fromDate(now),
//     }

//     //adding 
//     db.collection("recipes").add(recipe).then(() => {

//     }).catch(err => console.log(err));
//     form.recipe.value = "";


// })

// // Delete recipe from firestore 
// list.addEventListener("click", (e) => {
//     if(e.target.tagName === "BUTTON"){
//         const id = e.target.parentElement.getAttribute("data-id");
//         console.log(id);
//         db.collection("recipes")
//         .doc(id)
//         .delete()
//         .then(() => {
//             console.log("deleted");

//         });

//     }

     
// })


// unSubBtn.addEventListener("click", () => {
//      unsub();

// })



const form = document.querySelector("form");
const list = document.querySelector("ul");
const unsubBtn = document.querySelector(".unSub");



//Add recipes to UI 
const updateUI = (recipe, id) => {
    const time = recipe.created_time.toDate();

    const recipeInfoHtml = `
        <li  data-id="${id}">
            <div>${recipe.title}</div>
            <div>${time}</div>
            <button class="btn btn-danger btn-sm  my-2">Delete</button>
        </li>
    `
    list.innerHTML += recipeInfoHtml;
}

const removeRecipe = (id) => {
    for(let li of list.children){
        if(li.getAttribute("data-id") === id){
            li.remove();
        }
    }
}

//Getting recipes from firestore
// const unsubFun = db.collection("recipes").get().then(collection => {
//     collection.docs.forEach(doc => {
//         updateUI(doc.data(), doc.id);
//     })
// })

//   const unsub = db.collection("recipes").onSnapshot(snap => {
//         snap.docChanges().forEach(change => {
//             const doc = change.doc;
//             if(change.type === "added" ){
//                 console.log("aaa");
//                 addRecipe(doc.data(), doc.id); 
//             }else if(change.type === "removed"){
//                 deleteRecipe(doc.id);

//             }
//         }); 
//     })

const unsubFun = db.collection("recipes").onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        const doc = change.doc;
        console.log(doc.data());
        if(change.type === "added"){
            updateUI(doc.data(), doc.id);
        }else if(change.type === "removed"){
            removeRecipe(doc.id);

        }
    })
})



// Adding to  firestore
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = form.recipe.value;
    const now = new Date();
    const created_time = firebase.firestore.Timestamp.fromDate(now);


    const recipe = {
        title,
        created_time
    }
    form.recipe.value = "";
    console.log(recipe);
    db.collection("recipes").add(recipe).then(() => {
        console.log("Recipe added");
    })

})


// Deleting from firestore
list.addEventListener("click", (e) => {


    if(e.target.tagName === "BUTTON"){
        const id = e.target.parentElement.getAttribute("data-id");
        db.collection("recipes").doc(id).delete().then((ress) => {
            console.log("Delete ress: ", ress);
            console.log("Recipe deleted");
        });
    }

})
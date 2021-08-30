let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//get function
function fetchToys(){
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(jsonToys => {jsonToys.forEach(toy => renderToysCard(toy))
  })
}
fetchToys()

//post function
function postToys(obj){
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify(obj)
})
}

//patch function
function patchLikes(obj){
  console.log(obj)
  fetch(`http://localhost:3000/toys/${obj.id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj)
  })
    .then((response) => response.json())
    .then((json) => console.log(json))

}


//append images to webpage

function renderToysCard(toy){
  let toylikes = toy.likes
  //created card <div> and append to web
const cardDiv = document.createElement('div')
 document.querySelector("#toy-collection").append(cardDiv)
 cardDiv.classList.add('card')
 //created <h2> with toy name from DB and append to web
const toyName = document.createElement('h2')
 cardDiv.append(toyName)
 toyName.append(toy.name)
 //created <img>, applied class and src, and appended to web
const toyPic = document.createElement('img')
 toyPic.classList.add("toy-avatar")
 cardDiv.append(toyPic)
 toyPic.src = toy.image
 //created likes <p> and appended likes from DB
const likes = document.createElement('p')
 cardDiv.append(likes)
 likes.append('Likes  ' + toylikes)
 //created likes <button>, added class, id, and event listener
const likesButton = document.createElement('button')
 likesButton.classList.add("like-btn")
cardDiv.append(likesButton)
 likesButton.id = toy.id
 likesButton.append('like')
 //likeButton eventListener to increment likes on page
 likesButton.addEventListener('click', () => {likes.textContent = 'Likes ' + `${toy.likes +=1}`
    patchLikes(toy)
})
 
}

//form adds toy to database
document.querySelector("body > div.container > form > input.submit").addEventListener('click', e => handleSubmit(e))
function handleSubmit(e){
  e.preventDefault()
  let newCard = {
    name: document.querySelector("body > div.container > form > input:nth-child(2)").value,
    image: document.querySelector("body > div.container > form > input:nth-child(4)").value,
    likes: 0
  }
  postToys(newCard)
  
}

// //like button click event
// function handleLike(likesButton, toylikes){
//   likesButton.addEventListener('click', () => console.log(toylikes +=1))
//   //patchLikes(likeVal)
// }



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
const BASE_URL = "http://localhost:3000/toys";

fetch(BASE_URL) 
 .then((res) => (res.json()))
 .then((toyArray) => toyArray.forEach((toyObj) => renderToy(toyObj)))

 function renderToy(toyObj) {

  const toyDiv = document.createElement("div")
  toyDiv.className = "card";
 
  const toyName = document.createElement("h2")
  toyName.innerText = toyObj.name;

  const toyImage = document.createElement("img")
  toyImage.src = toyObj.image
  toyImage.className = "toy-avatar";

  const toyLikes = document.createElement("p")
  toyLikes.innerText = "Like: " + toyObj.likes;
 
  const likeBtn = document.createElement("button")
  likeBtn.innerText = "❤️"
  likeBtn.className = "like-btn";
  likeBtn.addEventListener("click", () => increaseLike(toyObj, toyLikes));  
	
	
 
  toyDiv.append(toyName, toyImage, toyLikes, likeBtn)
  
     const toyCollection = document.getElementById("toy-collection")
     toyCollection.appendChild(toyDiv);
 }

const form = document.querySelector("add-toy-form");
	
    form.addEventListener("submit", submitHandler)

function submitHandler(event){
	event.preventDefault()
	let newToy = {
		name: event.target.name.value,
		likes: 0,
		image: event.target.image.value
	}
	
	
	  fetch(BASE_URL,  {
		method: "POST",
		headers: 
		{
	    "Content-Type": "application/json",
		Accept: "application/json"
	  },
		
	  body: JSON.stringify(newToy)
	})
   
		.then(response => response.json())
		.then(newToy => renderToy(toyObj))
	}
	
	
  function increaseLike(toyObj, toyLikes) {
	++toyObj.likes;

	const configObj = {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
			},
			body: JSON.stringify(toyObj)
		}
	fetch(`http://localhost:3000/toys/${toyObj.id}`, configObj)
		.then(response => response.json())
		.then(toyObj => {
		   toyLikes.textContent = `Like: ${toyObj.likes}`;
		})
		.catch(error => {
			console.error("ERROR:", error);
		})
  
	}
 
	
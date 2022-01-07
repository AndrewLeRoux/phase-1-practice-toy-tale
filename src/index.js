let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  
  // for hiding and revealing form
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


  // fetches Andy's toys
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => toysAdder(json))

  // add a new toy
  const form = document.querySelector('.add-toy-form')
  form.addEventListener('submit', newToy)


});


//functions list

function toysAdder(toys){
  toys.forEach(toy => {
    toyAdder(toy)
  })
}

function toyAdder(toy){
  const toyCollection = document.querySelector('#toy-collection')
  const div = document.createElement('div')
  div.className = 'card'

  const h2 = document.createElement('h2');
  h2.innerHTML = toy.name
  div.appendChild(h2)

  const img = document.createElement('img');
  img.className = 'toy-avatar'
  img.src = toy.image
  div.appendChild(img)

  const p = document.createElement('p');
  p.innerHTML = toy.likes + ' Likes'
  div.appendChild(p)

  const button = document.createElement('button');
  button.className = 'like-btn'
  button.id = toy.id
  button.innerHTML = 'Like &#10084'
  div.appendChild(button)

  button.addEventListener('click', () => {
    toy.likes++
    p.innerHTML = toy.likes + ' Likes'
    updateLikes(toy)

  })

  toyCollection.appendChild(div)
}


function newToy(event){
  event.preventDefault();
  let toyObj = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0
  }
  addToyToServer(toyObj)
}

function addToyToServer(toy) {

  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
       Accept: "application/json"
    },
    body:JSON.stringify(toy)
  })
  .then(resp => resp.json())
  .then(json => toyAdder(json))

}



function updateLikes(toy){
  
  fetch(`http://localhost:3000/toys/${toy.id}`,{
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
       Accept: "application/json"
    },
    body:JSON.stringify(toy)
  })
}
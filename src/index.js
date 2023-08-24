
let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
    .then((response) => response.json())
    .then((toys) => toys.forEach((toy) => createToyCard(toy)))
    .catch((error) => console.log(error));
});
function createToyCard(toy){
  console.log(toy);
  const card = document.createElement("div");
  card.className = "card";

  const name = document.createElement("h2"); 
  name.textContent = toy.name; 

  const image = document.createElement("img"); 
  image.src = toy.image; image.className = "toy-avatar"; 
  

  const likes = document.createElement("p");
  likes.textContent = `Likes: ${toy.likes}`;
  

  const button = document.createElement("button");
  button.className = "like-btn";
  button.id = toy.id;
  button.textContent = "Like";
  card.append(name, image, likes, button);

  card.querySelector('.like-btn').addEventListener('click', () => {
    toy.likes+= 1;
    card.querySelector("p").textContent = `Likes: ${toy.likes}`;
    updateLikes(toy);
  })

  document.querySelector("#toy-collection").append(card);
}

function handleAddToy() {
  const toyNameInput = document.getElementById("toy-name");
  const toyImageInput = document.getElementById("toy-image");
  const toyName = toyNameInput.value;
  const toyImage = toyImageInput.value;

  const toyData = {
    name: toyName,
    image: toyImage,
    likes: 0,
  };

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toyData),
  })
    .then((response) => response.json())
    .then((newToy) => {
      const toyCard = createToyCard(newToy);
      document.querySelector(".toy-collection").appendChild(toyCard);
    })
    .catch((error) => console.log(error));
}
function updateLikes(toyData){
fetch(`http://localhost:3000/toys/${toyData.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toyData),
  })
  .then((response) => response.json())
  .then(toy => console.log(toy))

  }

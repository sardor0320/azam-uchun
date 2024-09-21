"use strict";

let tables = document.querySelector("#userTable");
let addButton = document.querySelector(".addNew");
let nameInput = document.getElementById("newUserName");
let modal = document.querySelector(".modall");
let editModal = document.querySelector(".edit-modal");
let closeEdit = document.querySelector("#close-edit");
let close = document.querySelector("#close");
let open = document.querySelector("#openn");
let modalUserName = document.querySelector(".modalUserName");
let modalUserEmail = document.querySelector(".modalUserEmail");
let modalUserPrice = document.querySelector(".modalUserPrice");
let add = document.querySelector("#crud-modal");
// let closeAdd = document.querySelector(".close-add")

function openAdd(){
  add.classList.remove("hidden")
}

function closeAdd(){
  add.classList.add("hidden")
}

function getFetch() {
  let row = users.map((item, index) => {
    return `<tr class="w-full bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <td class="py-3 px-6 text-left w-36 h-36 object-cover"><img src="${item.image} "></td>
                    <td class="py-3 px-6 text-left">${item.name}</td>
                    <td class="py-3 px-6 text-left overflow-auto">${item.description}</td>
                    <td class="py-3 px-6 text-left">${item.price}</td>
                    <td class="py-3 px-6 text-center">
                        <button class="infoBtn bg-blue-500 text-white px-4 py-2 rounded mr-2" data-index='${index}'>Info</button>
                        <button class="editBtn bg-yellow-500 text-white px-4 py-2 rounded mr-2" data-index="${index}">Edit</button>
                        <button onclick="deleteBtn(${index})" class="deleteBtn bg-red-500 text-white px-4 py-2 rounded" data-index="${index}" >Delete</button>
                    </td>
                 </tr>`;
  });
  tables.innerHTML = row.join("");

  document.querySelectorAll(".infoBtn").forEach((item) => {
    item.addEventListener("click", OpenModal);
  });

  document.querySelectorAll(".editBtn").forEach((item) => {
    item.addEventListener("click", openEditModal);
  });
}

getFetch();

function deleteBtn(index) {
  users.splice(index, 1);
  getFetch();
}

addButton.addEventListener("click", () => {
  addUsers();
});

function addUsers() {
  let img = document.querySelector(".img-add")
  let nameInput = document.getElementById("name-add");
  let descriptionInput = document.getElementById("#newUserDescription");
  let priceInput = document.getElementById("newUserPrice");
  
  let obg = {
    image: img.value, 
    name: nameInput.value,
    description: descriptionInput.value,
    price: priceInput.value,
  };
  if (nameInput.value && descriptionInput.value && priceInput.value ) {
    users.push(obg);
    img.value = "";
    nameInput.value = "";
    descriptionInput.value = "";
    priceInput.value = "";
    closeAdd();
    getFetch();
 
  } else {
      // alert("Iltimos, barcha maydonlarni to'ldiring.");
  }
  
}

function OpenModal(e) {
  let index = e.target.getAttribute("data-index");
  let data = users[index];
  modal.classList.remove("hidden");
  modalUserName.innerText = "Name: " + data.name;
  modalUserEmail.innerText = "Description: " + data.description;
  modalUserPrice.innerText = "Price: " + data.price;
}

close.addEventListener("click", () => {
  modal.classList.add("hidden");
});

function openEditModal(e) {
  let index = e.target.getAttribute("data-index");
  let user = users[index];

  editModal.classList.remove("hidden");

  document.querySelector("#edit-img").value = user.image;
  document.querySelector("#edit-name").value = user.name;
  document.querySelector("#edit-description").value = user.description;
  document.querySelector("#edit-price").value = user.price;

  document.querySelector("#saveEditBtn").addEventListener(
    "click",
    function () {
      saveEdit(index);
    },
    { once: true }
  );
}

function saveEdit(index) {
  let updatedImage = document.querySelector("#edit-img").value;
  let updatedName = document.querySelector("#edit-name").value;
  let updatedDescription = document.querySelector("#edit-description").value;
  let updatedPrice = document.querySelector("#edit-price").value;

  users[index] = {
    image: updatedImage,
    name: updatedName,
    description: updatedDescription,
    price: updatedPrice,
  };

  editModal.classList.add("hidden");
  getFetch();
}

closeEdit.addEventListener("click", () => {
  editModal.classList.add("hidden");
});

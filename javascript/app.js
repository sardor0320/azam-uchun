const products = document.querySelector(".products");
const cardsBody = document.querySelector(".cards_body");
const cardModal = document.querySelector(".cardModal");
const addNew = document.querySelector(".addNew");
const deleteModal = document.querySelector(".deleteModal");
const addModal = document.querySelector(".addModal");
const closeAddModal = document.querySelector(".closeAddModal");
const closeCardModal = document.querySelectorAll(".closeCardModal");
const closeDeleteModal = document.querySelectorAll(".closeDeleteModal");
const ism = document.querySelector(".name");
const category = document.querySelector(".category");
const price = document.querySelector(".price");
const description = document.querySelector(".description");
const save = document.querySelector(".save");

closeCardModal.forEach((item) => {
  item.addEventListener("click", () => {
    cardModal.classList.add("hidden");
  });
});
closeDeleteModal.forEach((item) => {
  item.addEventListener("click", () => {
    deleteModal.classList.add("hidden");
  });
});

let productId;

const getProducts = async () => {
  try {
    const data = await fetch("http://64.226.108.80:8090/product/list", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (!data.ok) {
      throw new Error("Failed to fetch products");
    }

    const res = await data.json();
    let row = "";

    res.body.forEach((item) => {
      row += `
        <div class="p-5 min-w-60 bg-gray-800 rounded-lg relative">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              ${item.name}
            </h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              ${item.description}
            </p>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Price: <span class="text-white">${item.price}</span>
            </p>
            <button onclick='addCard(${JSON.stringify(item)})' 
              class="rounded-lg px-5 py-2 bg-blue-500 text-white">Add to cart
            </button>
            <button onclick='editProduct(${JSON.stringify(item)})' 
              class="rounded-lg px-5 py-2 bg-yellow-500 text-white">Edit
            </button>
            <button onclick='deleteProduct(${item.id})' 
              class="rounded-lg px-5 py-2 bg-red-500 text-white">Delete
            </button>
        </div>
      `;
    });

    products.innerHTML = row;
  } catch (error) {
    console.error("Error fetching products:", error);
    alert("Failed to load products. Please try again later.");
  }
};

function addCard(product) {
  const productsInCart = JSON.parse(localStorage.getItem("products")) || [];

  const existProduct = productsInCart.find((p) => p.id === product.id);

  if (existProduct) {
    const filter = productsInCart.filter(
      (product) => product.id !== existProduct.id
    );

    const updateProduct = [
      ...filter,
      { ...existProduct, quantity: existProduct.quantity + 1 },
    ];
    localStorage.setItem("products", JSON.stringify(updateProduct));
  } else {
    productsInCart.push({ ...product, quantity: 1 });
    localStorage.setItem("products", JSON.stringify(productsInCart));
  }
}

const openCard = () => {
  cardModal.classList.remove("hidden");

  const cards = JSON.parse(localStorage.getItem("products")) || [];
  let row = "";

  cards.forEach((item) => {
    row += `
      <div class="w-full bg-gray-500 flex justify-between text-white p-2 rounded-lg">
        <h1 class="text-xl">${item.name}</h1>
        <div class="max-w-2/4">
          <p class="text-lg line-clamp-1">Price: ${item.price}</p>
          <p class="text-lg line-clamp-1">Quantity: ${item.quantity}</p>
          <p class="text-lg line-clamp-1">Description: ${item.description}</p>
        </div>
      </div>
    `;

    cardsBody.innerHTML = row;
  });
};

function editProduct(product) {
  console.log("Edit product:", product);
}

function deleteProduct(id) {
  productId = id;
  deleteModal.classList.remove("hidden");
}

async function deletePro() {
  try {
    await fetch(`http://64.226.108.80:8090/product/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    getProducts();
    deleteModal.classList.add("hidden");
  } catch (error) {
    console.log(error);
  }
}

getProducts();

addNew.addEventListener("click", async () => {
  addModal.classList.remove("hidden");

  try {
    const response = await fetch("http://64.226.108.80:8090/category/list", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    const data = await response.json();

    let row = "";
    data.body.forEach((item) => {
      row += `<option value="${item.id}">${item.name}</option>`;
    });

    category.innerHTML = row;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
});

closeAddModal.addEventListener("click", () => {
  addModal.classList.add("hidden");
});

const addProduct = async () => {
  const productData = {
    name: ism.value,
    description: description.value,
    categoryId: category.value,
    price: price.value,
    file: [0],
  };

  const data = await fetch("http://64.226.108.80:8090/product/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    body: JSON.stringify(productData),
  });

  const res = data.json();

  getProducts();
  addModal.classList.add("hidden");
  console.log(res);

};

save.addEventListener("click", () => addProduct());

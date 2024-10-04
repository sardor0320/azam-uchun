const products = document.querySelector(".products");
const cardsBody = document.querySelector(".cards_body");
const cardModal = document.querySelector(".cardModal");
const addModal = document.querySelector(".addModal");
const closeCardModal = document.querySelectorAll(".closeCardModal");

closeCardModal.forEach((item) => {
  item.addEventListener("click", () => {
    cardModal.classList.add("hidden");
  });
});

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
        </div>
      `;
    });

    products.innerHTML = row;
  } catch (error) {
    console.error("Error fetching products:", error);
    alert("Failed to load products. Please try again later.");
  }
};

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

getProducts();

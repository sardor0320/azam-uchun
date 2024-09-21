let thead = document.querySelector("#thead");
let modal = document.querySelector("#modal");
let close = document.querySelector("#Close");
close.addEventListener("click", () => {
  modal.classList.add("hidden");
});

fetch("http://161.35.214.247:8090/user/list", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    data.body.forEach((item, index) => {
      console.log(item);

      thead.innerHTML +=
        item.role === "ROLE_ADMIN"
          ? ""
          : `
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" id="product-${
          item.id
        }">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            ${item.fullName}
          </th>
          <td class="px-6 py-4">${item.userName}</td>
          <td class="px-6 py-4">${
            item.role === "ROLE_BUYER"
              ? "Sotib oluvchi"
              : item.role === "ROLE_SELLER"
              ? "Sotuvchi"
              : item.role === "ROLE_CUSTOMER" && "Customer"
          }</td>
          <td class="px-6 py-4">
            <a
              href="#"
              class="edit-btn font-medium text-white px-4 py-2 rounded bg-yellow-500 text-white"
              data-id="${item.id}"
            >Edit ✏️</a>
            <a
              href="#"
              class="delete-btn font-medium text-white px-4 py-2 rounded mx-2 bg-red-500 text-white"
              data-id="${item.id}"
            >Delete 🗑️</a>
          </td>
        </tr>
        `;
    });

    const editButtons = document.querySelectorAll(".edit-btn");
    editButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        modal.classList.remove("hidden");
        let name = document.querySelector("#name");
        let price = document.querySelector("#price");
        let category = document.querySelector("#category");
        fetch(`http://161.35.214.247:8090/product/update/${productId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
            body: JSON.stringify({
              id: 0,
              name: "jewudgug",
              description: "jdxhdg",
              categoryId: 20,
              price: 2000,
              file: [0],
            }),
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      });
    });

    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const productId = e.target.getAttribute("data-id");
        console.log(productId);

        if (1) {
          fetch(`http://161.35.214.247:8090/user/delete/${productId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
            .then((response) => {
              if (response.ok) {
                const productRow = document.querySelector(
                  `#product-${productId}`
                );
                productRow.remove();
              } else {
                alert("Failed to delete the product.");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
              alert("An error occurred while deleting the product.");
            });
        }
      });
    });
  });

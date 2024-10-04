let thead = document.querySelector("#thead");
let modal = document.querySelector("#modal");
let close = document.querySelector("#Close");
let currentUserId;

close.addEventListener("click", () => {
  modal.classList.add("hidden");
});

fetch("http://64.226.108.80:8090/user/list", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    data.body.forEach((item) => {
      if (item.role !== "ROLE_ADMIN") {
        thead.innerHTML += `
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" id="product-${
          item.id
        }">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            ${item.fullName}
          </th>
          <td class="px-6 py-4">${item.userName}</td>
          <td class="px-6 py-4">${
            item.role === "ROLE_BUYER"
              ? "Sotib oluvchi"
              : item.role === "ROLE_SELLER"
              ? "Sotuvchi"
              : "Customer"
          }</td>
          <td class="px-6 py-4">
            <a href="#" class="edit-btn font-medium text-white px-4 py-2 rounded bg-yellow-500" data-id="${
              item.id
            }">Edit ✏️</a>
            <a href="#" class="delete-btn font-medium text-white px-4 py-2 rounded mx-2 bg-red-500" data-id="${
              item.id
            }">Delete 🗑️</a>
          </td>
        </tr>`;
      }
    });

    const editButtons = document.querySelectorAll(".edit-btn");
    editButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        currentUserId = btn.getAttribute("data-id"); 
        modal.classList.remove("hidden");
      });
    });

    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault(); 
        const productId = btn.getAttribute("data-id");
        if (
          confirm("Ushbu foydalanuvchini o'chirishga ishonchingiz komilmi?")
        ) {
          fetch(`http://64.226.108.80:8090/user/delete/${productId}`, {
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
                alert("Foydalanuvchini o'chirishda xato.");
              }
            })
            .catch((error) => {
              console.error("Xato:", error);
              alert("Foydalanuvchini o'chirishda muammo yuz berdi.");
            });
        }
      });
    });
  });

function updateRole(e) {
  console.log(e);
  e.preventDefault();

  const role = document.querySelector("#role").value; 
  fetch(
    `http://64.226.108.80:8090/user/update/role/${currentUserId}?role=${role}`,
    {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      modal.classList.add("hidden"); 
      location.reload(); 
    })
    .catch((error) => {
      console.error("Xato:", error);
      alert("Ro'lni yangilashda muammo yuz berdi.");
    });
}

const btn = document.getElementById("btn");
btn.addEventListener("click", (e) => updateRole(e));

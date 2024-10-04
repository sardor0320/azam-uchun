let username = document.getElementById("email");
let password = document.getElementById("password");
console.log(1);

function register() {
  console.log("salom");

  let userdata = {
    login: username.value,
    password: password.value,
  };
  console.log(userdata);

  let init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userdata),
  };

  if (username.value !== "") {
    console.log("ishladi");

    fetch("http://64.226.108.80:8090/auth/login", init)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((res) => {
        console.log(res);

        if (res.success == true) {
          console.log(res);
          if (res.role == "ROLE_ADMIN") {
            window.location.href = "/html/admin.html";
          } else if (res.role == "ROLE_SELLER") {
            window.location.href = "/html/index.html";
          } else if (res.role == "ROLE_BUYER") {
            window.location.href = "/html/buyer.html";
            
          }
          localStorage.setItem("token", res.token)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

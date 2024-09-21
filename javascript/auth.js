let firstname = document.getElementById("firstname");
let lastname = document.getElementById("lastname");
let userName = document.getElementById("userName");
let password = document.getElementById("password");
let prePassword = document.getElementById("prePassword");
console.log(1);

function register() {
  console.log("salom");

  let userdata = {
    firstname: firstname.value,
    lastname: lastname.value,
    userName: userName.value,
    password: password.value,
    prePassword: prePassword.value,
    fileId: 0,
  };
  console.log(userdata);
  
  let init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userdata),
  };
  if (firstname.value !== "") {
    console.log("ishladi");
    
    fetch("http://161.35.214.247:8090/auth/register", init)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((res) => {
        if (res.success == true ) {
          console.log(res);
          window.location.href = "/html/login.html";
        }
      }).catch((err) =>{
        console.log(err);
        
      })
    }
}
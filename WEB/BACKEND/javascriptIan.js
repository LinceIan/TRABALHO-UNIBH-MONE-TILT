const forms = JSON.parse(sessionStorage.getItem("forms"));

const logginButton = document.getElementById("logginButton");

logginButton.onclick = () => window.location.href = "../TELAS LARA/lara.html";

const env = {
  url: "https://api-money-tilt.herokuapp.com"
}

const myBtn = document.getElementById("myBtn");

myBtn.onclick = () => {
  fetch(`${env.url}/users`, {
    method: 'POST',
    body: JSON.stringify({ ...forms,  phone: null, favoriteCoins: []}),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(() => sessionStorage.removeItem("forms"));
}

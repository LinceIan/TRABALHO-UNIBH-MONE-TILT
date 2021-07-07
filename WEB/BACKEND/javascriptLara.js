const email = document.getElementById("exampleInputEmail1");
const password = document.getElementById("exampleInputPassword1");

const feedbackField = document.getElementById("feedback");

const submitButton = document.getElementById("login");

const env = {
  url: "https://api-money-tilt.herokuapp.com"
}

submitButton.onclick = () => {
  fetch(`${env.url}/login`, {
    method: 'POST',
    body: JSON.stringify({ email: email.value, password: password.value }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }).then(res => res.json())
    .then(res => {
      if(res.status !== 202) throw new Error(res.message);

      window.sessionStorage.setItem("isLogged", true);
      window.sessionStorage.setItem("id", res.id);
      window.location.href = "../TELAS THIAGO/thiago.html";
    }).catch(e => feedbackField.innerText = e);
}
const nome = document.getElementById("nome");
const data = document.getElementById("data");
const email = document.getElementById("email");
const telefone = document.getElementById("telefone");

const tbody = document.getElementById("tbody");

const titleName = document.getElementById("titleName");

const id = window.sessionStorage.getItem("id");

const env = {
  url: "https://api-money-tilt.herokuapp.com"
}

fetch(`${env.url}/users/${id}`)
  .then(res => res.json())
  .then(res => {
    nome.value = res.name;
    titleName.append(` ${res.name}`);
    data.value = res.birthDate;
    email.value = res.email;
    telefone.value = res.phone;

    res.favoriteCoins.map(coin => {
      const tr = document.createElement("tr");
      const firstTd = document.createElement("td");

      fetch(`${env.url}/infoCompleta/${coin}`)
        .then(coinInfo => coinInfo.json())
        .then(coinInfo => {
          const name = coinInfo.cotacao.name.slice(0, coinInfo.cotacao.name.indexOf("/"));
          const img = document.createElement("img");
          img.src = "../TELAS THIAGO/fillStar.svg";
          img.alt = "Estrela vazia";
          img.onclick = (() => {
            tr.parentNode.removeChild(tr);

            fetch(`${env.url}/users/${window.sessionStorage.getItem("id")}`)
              .then(getUser => getUser.json())
              .then(getUser => {
                const newFavoriteCoins = getUser.favoriteCoins.filter(currentCoin => currentCoin !== coin);

                console.log(newFavoriteCoins);
                
                fetch(`${env.url}/users/${window.sessionStorage.getItem("id")}`, {
                  method: 'PATCH',
                  body: JSON.stringify({favoriteCoins: newFavoriteCoins}),
                  headers: {
                    "Content-type": "application/json; charset=UTF-8"
                  }
                })
              })

          })

          firstTd.appendChild(img);
          firstTd.append(`  ${name} (${coin})`);
        });

      const secondTd = document.createElement("td");
      const button = document.createElement("button");
      button.type = "button";
      button.className = "btn btn-default botaoI";
      button.onclick = () => window.location.href = `../TELAS TAIS/tais.html?coin=${coin}`
      button.append("i");

      secondTd.appendChild(button);

      tr.appendChild(firstTd);
      tr.appendChild(secondTd);

      tbody.appendChild(tr);
    })
  })

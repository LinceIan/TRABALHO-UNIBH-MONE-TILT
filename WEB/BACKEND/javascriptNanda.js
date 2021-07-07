const env = {
  localUrl: "https://api-money-tilt.herokuapp.com"
}

const gmtDate = document.getElementsByClassName("gmt")[0];
const today = new Date();

gmtDate.append(`GMT-3 - ${today.getDate()}/${today.getMonth()}/${today.getFullYear()} - ${today.getHours()}:${today.getMinutes()}`);

const tableCoins = document.getElementById("table-coins");
const loading = document.getElementById("Loading");

fetch(`${env.localUrl}/infoCompleta/all`)
  .then(res => res.json())
  .then(res => {
    fetch(`${env.localUrl}/users/${window.sessionStorage.getItem("id")}`)
      .then(user => user.json())
      .then(user => {
        const favoriteCoins = user.favoriteCoins;

        res.map((current) => {
          const key = current.code;
          const tr = document.createElement("tr");
          const firstColumn = document.createElement("td");
      
          const star = document.createElement("img");
          let isFavorite = favoriteCoins.includes(key);
          star.src = isFavorite ? "../TELAS THIAGO/fillStar.svg":"../emptyStar.svg";
          star.alt = "Estrela vazia"
          star.onclick = (() => {
            isFavorite = !isFavorite;
            star.src = isFavorite ? "../TELAS THIAGO/fillStar.svg":"../emptyStar.svg";

            fetch(`${env.localUrl}/users/${window.sessionStorage.getItem("id")}`)
              .then(getUser => getUser.json())
              .then(getUser => {
                let newFavoriteCoins;

                if(isFavorite) newFavoriteCoins = [...getUser.favoriteCoins, key];
                else newFavoriteCoins = getUser.favoriteCoins.filter(currentCoin => currentCoin !== key);

                fetch(`${env.localUrl}/users/${window.sessionStorage.getItem("id")}`, {
                  method: 'PATCH',
                  body: JSON.stringify({favoriteCoins: newFavoriteCoins}),
                  headers: {
                    "Content-type": "application/json; charset=UTF-8"
                  }
                })
              })

          })
    
          const name = current.name.slice(0, current.name.indexOf("/"));
      
          const coinName = document.createElement("span");
          coinName.append(`  ${name} (${key})`);
      
          firstColumn.appendChild(star);
          firstColumn.appendChild(coinName);
      
          tr.appendChild(firstColumn);
    
          const secondColumn = document.createElement("td");
          secondColumn.append(`R$ ${current.ask.replace(".",",")}`);
    
          tr.appendChild(secondColumn);
    
          const thirdColumn = document.createElement("td");
          thirdColumn.append(current.pctChange.replace(".",",") + "%");
    
          tr.appendChild(thirdColumn);
    
          const fourthColumn = document.createElement("td");
    
          const iButton = document.createElement("button");
          iButton.type = "button";
          iButton.classList = "btn btn-default botaoi";
          iButton.append("i");
          iButton.onclick = () => {
            window.location.href = `../TELAS TAIS/tais.html?coin=${key}`;
          }
    
          fourthColumn.appendChild(iButton);
    
          tr.appendChild(fourthColumn);
      
          tableCoins.appendChild(tr);
        })
    
        loading.style.display = "none";
      })
  })
  
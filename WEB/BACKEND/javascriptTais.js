const env = {
  apiUrl: "https://api-money-tilt.herokuapp.com"
}

const coinTitleH3 = document.getElementById("coin-title-h3");
const coinTitleH3Bold = document.createElement("b");

const coinTitleH5Name = document.getElementById("coin-title-h5-name");
const coinTitleH5Short = document.getElementById("coin-title-h5-short");

const compraValue = document.getElementById("compra-value");
const vendaValue = document.getElementById("venda-value");
const variacaoValue = document.getElementById("variacao-value");
const variacaoPercentageValue = document.getElementById("variacao-percentage-value");
const maxValue = document.getElementById("max-value");
const minValue = document.getElementById("min-value");

function converteValorParaReal(value) {
  let ret = "";

  if (value.includes("-")){
    value.replace("-","");
    ret += "- "
  }

  ret += "R$ ";
  ret += value.replace(".",",");

  return ret;
}

function converteValorParaPercentagem(value) {
  return `${value} %`;
}

function loadInfo() {
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);

  const coinCode = urlParams.get('coin');

  fetch(`${env.apiUrl}/infoCompleta/${coinCode}`)
    .then(res => res.json())
    .then(res => {
      coinTitleH3Bold.append(res.name);
      coinTitleH3.append("Cotação do: ");
      coinTitleH3.appendChild(coinTitleH3Bold);

      coinTitleH5Name.append(res.name.toUpperCase());
      coinTitleH5Short.append(coinCode);

      compraValue.append(converteValorParaReal(res.cotacao.bid));
      vendaValue.append(converteValorParaReal(res.cotacao.ask));

      variacaoValue.append(converteValorParaReal(res.cotacao.varBid));
      variacaoPercentageValue.append(converteValorParaPercentagem(res.cotacao.pctChange));

      maxValue.append(converteValorParaReal(res.cotacao.high));
      minValue.append(converteValorParaReal(res.cotacao.low));
    });
}

document.addEventListener('DOMContentLoaded', loadInfo);
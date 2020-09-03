const $ = require("jquery");
import axios from "axios";
import "./style.css";

const url = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";

const xhrButton = document.querySelector("#xhr");
const fetchButton = document.querySelector("#fetch");
const jqueryButton = document.querySelector("#jquery");
const axiosButton = document.querySelector("#axios");
const quote = $("#quote");
const xhr = new XMLHttpRequest();

function xhrHandler() {
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      quote.text(JSON.parse(xhr.response)[0]);
    } else if (this.status == 404) {
      console.log("Error with request.");
    }
  };
  xhr.open("GET", url);
  xhr.send();
}

function fetchHandler() {
  console.log("click fetch");
  fetch(url, {
    method: "GET",
  })
    .then((res) => {
      if (!res.ok) {
        throw Error(res.status);
      } else {
        return res;
      }
    })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      quote.text(data[0]);
    })
    .catch((err) => console.log(err));
}

function jqueryHandler() {
  console.log("click jquery");
  $.ajax({
    method: "GET",
    url: url,
  })
    .done((data) => {
      quote.text(data[0]);
    })
    .fail(() => alert("It failed"));
}

function axiosHandler() {
  console.log("click axios");
  axios
    .get(url)
    .then((res) => quote.text(res.data[0]))
    .catch((err) => console.log(err));
}

xhrButton.addEventListener("click", xhrHandler);
fetchButton.addEventListener("click", fetchHandler);
jqueryButton.addEventListener("click", jqueryHandler);
axiosButton.addEventListener("click", axiosHandler);

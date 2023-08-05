let globalVar = "";

class MyCard extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    const h2 = document.createElement("h2");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const a = document.createElement("a");
    h2.setAttribute("id", "h2");
    img.setAttribute("id", "img");
    p.setAttribute("id", "p");
    a.setAttribute("id", "a");
    this.shadow.appendChild(h2);
    this.shadow.appendChild(img);
    this.shadow.appendChild(p);
    this.shadow.appendChild(a);
  }

  connectedCallback() {}
}
customElements.define("my-card", MyCard);

function init() {
  let element;
  element = document.getElementById("loadRemote");
  element.addEventListener("click", saveFetch);
  element = document.getElementById("loadLocal");
  element.addEventListener("click", function () {
    saveLocal();
  });
}

async function saveFetch() {
  let res = await fetch(
    "https://my-json-server.typicode.com/AungKyaw321/hw4_p2/cards"
  );
  res = await res.json();
  globalVar = res;
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  for (let i = 0; i < globalVar.length; i++) {
    const card = document.createElement("my-card");
    card.shadowRoot.getElementById("h2").innerText = globalVar[i].name;

    card.shadowRoot
      .getElementById("img")
      .setAttribute("src", globalVar[i].image);
    card.shadowRoot.getElementById("img").setAttribute("height", "100px");
    card.shadowRoot.getElementById("p").innerText = globalVar[i].description;
    card.shadowRoot.getElementById("a").setAttribute("href", globalVar[i].link);
    card.shadowRoot.getElementById("a").innerText = "click me";
    cardContainer.appendChild(card);
  }
}
const dataLocal = [
  {
    name: "Load Local A",
    image: "/localimages/pic1.jpg",
    description: "This is a description from Load Local 1",
    link: "https://developer.mozilla.org/en-US/",
  },
  {
    name: "Load Local B",
    image: "/localimages/pic2.jpg",
    description: "This is a description from Load Local 2",
    link: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
  },
  {
    name: "Load Local C",
    image: "/localimages/pic3.jpg",
    description: "This is a description from Load Local 3",
    link: "https://developer.mozilla.org/en-US/docs/Web/CSS/font-palette",
  },
];
const jsonString = JSON.stringify(dataLocal);
localStorage.setItem("localData", jsonString);

function saveLocal() {
  const localData = localStorage.getItem("localData");
  let localVar = JSON.parse(localData);
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  for (let i = 0; i < localVar.length; i++) {
    const card = document.createElement("my-card");
    card.shadowRoot.getElementById("h2").innerText = localVar[i].name;
    card.shadowRoot
      .getElementById("img")
      .setAttribute("src", localVar[i].image);
    card.shadowRoot.getElementById("img").setAttribute("height", "100px");
    card.shadowRoot.getElementById("p").innerText = localVar[i].description;
    card.shadowRoot.getElementById("a").setAttribute("href", localVar[i].link);
    card.shadowRoot.getElementById("a").innerText = "click me";
    cardContainer.appendChild(card);
  }
}

window.addEventListener("DOMContentLoaded", init);

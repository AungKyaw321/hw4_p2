let globalVar = "";

class MyElement extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    const h2 = document.createElement("h2");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const a = document.createElement("a");
    h2.setAttribute("id", "h2");
    // h2.innerText = "Hello";
    img.setAttribute("id", "img");
    // img.setAttribute("src", "/images/cat.jpg");
    p.setAttribute("id", "p");
    // p.innerText = "Somehting";
    a.setAttribute("id", "a");
    // a.setAttribute("href", "https://developer.mozilla.org/en-US/");
    // a.innerText = "click me";
    this.shadow.appendChild(h2);
    this.shadow.appendChild(img);
    this.shadow.appendChild(p);
    this.shadow.appendChild(a);
  }

  connectedCallback() {
    // browser calls this method when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)
  }
}

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
  console.log(globalVar[1].description);
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  for (let i = 0; i < globalVar.length; i++) {
    const card = document.createElement("my-test");
    console.log(i);
    card.shadowRoot.getElementById("h2").innerText = globalVar[i].name; // Change the attribute

    card.shadowRoot
      .getElementById("img")
      .setAttribute("src", globalVar[i].image); // Change the attribute
    card.shadowRoot.getElementById("img").setAttribute("height", "100px");
    card.shadowRoot.getElementById("p").innerText = globalVar[i].description; // Change the attribute
    card.shadowRoot.getElementById("a").setAttribute("href", globalVar[i].link);
    card.shadowRoot.getElementById("a").innerText = "click me"; // Change the attribute
    cardContainer.appendChild(card);
  }
}
const data = [
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
  // Add more objects as needed
];
const jsonString = JSON.stringify(data);
localStorage.setItem("localData", jsonString);
console.log("Added to Local Storage");

function saveLocal() {
  const localData = localStorage.getItem("localData");
  let data = JSON.parse(localData);
  console.log(data);
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    const card = document.createElement("my-test");
    card.shadowRoot.getElementById("h2").innerText = data[i].name; // Change the attribute
    card.shadowRoot.getElementById("img").setAttribute("src", data[i].image); // Change the attribute
    card.shadowRoot.getElementById("img").setAttribute("height", "100px");
    card.shadowRoot.getElementById("p").innerText = data[i].description; // Change the attribute
    card.shadowRoot.getElementById("a").setAttribute("href", data[i].link);
    card.shadowRoot.getElementById("a").innerText = "click me"; // Change the attribute
    cardContainer.appendChild(card);
  }
}

customElements.define("my-test", MyElement);

window.addEventListener("DOMContentLoaded", init);

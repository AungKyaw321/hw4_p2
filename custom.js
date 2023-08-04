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

  // there can be other element methods and properties
}
function init() {
  element = document.getElementById("loadRemote");
  element.addEventListener("click", function () {
    saveFetch();
    console.log("inEvent");
  });
}
async function saveFetch() {
  let res = await fetch(
    "https://my-json-server.typicode.com/AungKyaw321/hw4_p2/cards"
  );
  res = await res.json();
  console.log(res);
  globalVar = res;
  console.log(globalVar[0].name);
  let data = document.querySelector("my-test"); // Select the custom element instance
  // console.log(data.shadowRoot.getElementById("h2").innerText);
  data.shadowRoot.getElementById("h2").innerText = globalVar[0].name; // Change the attribute
  // console.log(data.shadowRoot.getElementById("img").innerText);
  data.shadowRoot.getElementById("img").innerText = globalVar[0].image; // Change the attribute
  // console.log(data.shadowRoot.getElementById("p").innerText);
  data.shadowRoot.getElementById("p").innerText = globalVar[0].description; // Change the attribute
  // console.log(data.shadowRoot.getElementById("a").innerText);
  data.shadowRoot.getElementById("a").innerText = globalVar[0].link; // Change the attribute
  // console.log(globalVar);
}

customElements.define("my-test", MyElement);

/*
const myTest = document.createElement("my-test");

*/
window.addEventListener("DOMContentLoaded", init);

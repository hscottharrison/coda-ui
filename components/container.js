const containerTemplate = document.createElement('template');
containerTemplate.innerHTML = `
  <link rel="stylesheet" href="../styles/main.css" />
  <style>
    .container {
      width: 70%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 4em;
    }
  </style>

  <div class="container">
    <slot name="container-content"></slot>
  <div>
`

class Container extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(containerTemplate.content.cloneNode(true));
  } 
}

window.customElements.define('coda-container', Container);
const wrapperTemplate = document.createElement('template');
wrapperTemplate.innerHTML = `
  <link rel="stylesheet" href="../styles/main.css" />
  <style>
    .wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      margin-bottom: 4em;
    }
  </style>

  <div class="wrapper">
    <slot name="wrapper-content"></slot>
  <div>
`

class Wrapper extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(wrapperTemplate.content.cloneNode(true));
  } 
}

window.customElements.define('coda-wrapper', Wrapper);
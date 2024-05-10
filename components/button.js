const buttonTemplate = document.createElement('template');
buttonTemplate.innerHTML = `
  <style>
    .button {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      background-color: #007bff;
      color: white;
      border: none;
      height: 50px;
      min-width: 100px;
      font-weight: bold;
    }

    .button:hover {
      background: #0056b3;
    }
  </style>
  <button class="button">
    Button
  </button>
`;

class CodaButton extends HTMLElement {
  button;
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(buttonTemplate.content.cloneNode(true));
  }
  
  connectedCallback() {
    this.button = this.shadowRoot.querySelector('button');
    this.initDataAttributes();
    this.initStyleAttributes();
  }
  
  initDataAttributes() {
    if (this.hasAttribute('text')) {
      this.button.textContent = this.getAttribute('text');
    }
  }
  
  initStyleAttributes() {
    if (this.hasAttribute('textColor')) {
      this.button.style.color = this.getAttribute('textColor');
    }
  
    if (this.hasAttribute('color')) {
      this.button.style.backgroundColor = this.getAttribute('color');
    }
  
    if (this.hasAttribute('hoverColor')) {
      this.button.addEventListener('mouseover', () => {
        this.button.style.backgroundColor = this.getAttribute('hoverColor');
      });
      this.button.addEventListener('mouseout', () => {
        this.button.style.backgroundColor = this.getAttribute('color') || '#007bff';
      });
    }
  }
}

window.customElements.define('coda-button', CodaButton);
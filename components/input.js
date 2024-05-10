const inputTemplate = document.createElement('template');
inputTemplate.innerHTML = `
  <link rel="stylesheet" href="styles/main.css">
  <style>
    .form-field-wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 1rem;
    }

    .input {
      padding: 0.5rem;
      border-radius: 4px;
      height: 50px;
      width: 100%;
      border: 1px solid #ccc;
      font-size: 16px;
    }

    .input-label {
      margin-bottom: 0.5rem;
      font-weight: bold;
    }
  </style>
  <div class="form-field-wrapper">
    <label class="input-label" for="name">
      Label
    </label>
    <input class="input" type="text" placeholder="Enter your name">
  </div>
`;

class CodaInput extends HTMLElement {
  input;
  label;
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(inputTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.input = this.shadowRoot.querySelector('input');
    this.label = this.shadowRoot.querySelector('label');

    this.initDataAttributes();
    this.initStyleAttributes();
  }

  initStyleAttributes() {
    if (this.hasAttribute('width')) {
      this.input.style.width = `${this.getAttribute('width')}%`;
    }

    if (this.hasAttribute('focusColor')) {
      const style = this.shadowRoot.querySelector('style');
      style.innerHTML += `
        .input:focus {
          outline: none;
          border: 3px solid ${this.getAttribute('focusColor')};
        }
      `;
    }
  }

  initDataAttributes() {
    if (this.hasAttribute('id')) {
      this.input.id = this.getAttribute('id');
      this.label.htmlFor = this.getAttribute('id');
    }

    if (this.hasAttribute('placeholder')) {
      this.input.placeholder = this.getAttribute('placeholder');
    }

    if (this.hasAttribute('label')) {
      this.label.textContent = this.getAttribute('label');
    }
  }
}

customElements.define('coda-input', CodaInput);
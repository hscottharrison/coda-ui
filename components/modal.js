const modalTemplate = document.createElement('template');
modalTemplate.innerHTML = `
  <style>
    * {
    box-sizing: border-box;
    margin: 0;
    line-height: 1.5em;
    cursor: pointer;
    }

    html {
    scroll-behavior: smooth;
    }

    body {
    /* background-color: #e0e3dc; */
    font-family: Montserrat;
    }
    .modal-wrapper {
      display: none;
      height: 100vh;
      width: 100%;
      background-color: rgba(0, 0, 0, .3);
      position: absolute;
      z-index: 999999999;
      left: 0;
    }

    .modal-container {
      height: 90%;
      width: 90%;
      background-color: #fff;
      border-radius: 10px;
      display: flex;
      position: relative;
      padding: 3em 2em;
    }


    .open {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .close-button {
      border: none;
      background-color: #fff;
      position: absolute;
      top: 1em;
      right: 1em;
    }
  </style>

  <div class="modal-wrapper">
    <div class="modal-container">
      <button class="close-button">
        <h1>X</h1>
      </button>
      <slot name="content" />
    </div>
  </div>
`

class Modal extends HTMLElement {
  open = false;
  wrapper;
  static observedAttributes = ['scroll'];
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(modalTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.wrapper = this.shadowRoot.querySelector('.modal-wrapper');

    const closeButton = this.shadowRoot.querySelector('.close-button');
    closeButton.style.color = this.getAttribute('primaryColor') || '#000';
  }

  attributeChangedCallback() {
    const scroll = this.getAttribute('scroll');
    const body = document.querySelector('body');
    if(scroll) {
      this.open = true;
      this.wrapper.classList.add('open');
      this.wrapper.style.top = `${this.getAttribute('scroll')}px`;
      body.style.overflow = 'hidden';
      
      this.shadowRoot.querySelector('.close-button').addEventListener('click', () => {
        this.wrapper.classList.remove('open');
        body.style.overflow = 'scroll';
      });
    };
  }

}

window.customElements.define('coda-modal', Modal);

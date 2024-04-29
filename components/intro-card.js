const introCardTemplate = document.createElement('template');
introCardTemplate.innerHTML = `
  <style>
    .introduction-wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .introduction {
      width: 70%;
      margin-top: -7em;
      min-height: 300px;
      background-color: #fff;
      padding: 1.5em;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .introduction-header {
      font-size: 32px;
      font-weight:bolder;
      margin-bottom: 0.5em;
    }

    .introduction-content {
      font-size: 16px;
    }

    @media screen and (max-width: 1500px) {
      .introduction {
        width: 90%;
      }
    }
  </style>
  <div class="introduction-wrapper">
    <div class="introduction">
      <h2 class="introduction-header">
        <slot name="header" />
      </h2>
      <p class="introduction-content">
        <slot name="content"
      </p>
    </div> 
  </div>
`

class IntroCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(introCardTemplate.content.cloneNode(true));
  } 

  connectedCallback() {
    this.initStyles()
  }

  initStyles() {
    // ATTRIBUTES
    const headerColor = this.getAttribute('headerColor');

    // ELEMENTS
    const header = this.shadowRoot.querySelector('.introduction-header');

    if(headerColor) {
      header.style.color = headerColor;
    }
  }

}

window.customElements.define('intro-card', IntroCard);
const heroTemplate = document.createElement('template');
heroTemplate.innerHTML = `
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

  .hero-container {
    height: 80vh;
    width: 100%;
    background: #000;
    background-size: cover;
  }

  .hero-shadow-wrapper {
    height: 80vh;
    background-color: rgba(0, 0, 0, 0.3);
    padding-left: 4em;
    display: flex;
    align-items: center;
  }

  .header-wrapper {
    width: 40%;
  }

  .hero-header {
    color: #fff;
    font-size: 64px;;
  }

  @media screen and (max-width: 1100px) {
    .hero-container {
      height: 80vh !important;
    }

    .hero-shadow-wrapper {
      height: 80vh   !important;
    }
  }

  @media screen and (max-width: 900px) {
    .hero-container {
      height: 50vh !important;
    }

    .header-wrapper {
      width: 100%;
    }

    .hero-header {
      font-size: 32px;
    }

    .hero-shadow-wrapper {
      padding-left: 1em;
      height: 50vh !important;
    }
  }
  </style>
  <section class="hero-container">
    <div class="hero-shadow-wrapper">
      <div class="header-wrapper">
        <h1 class="hero-header">
          <slot name="headerMessage" />
        </h1>
      </div>
    </div>
  </section>
`

class Hero extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(heroTemplate.content.cloneNode(true));
  } 

  connectedCallback() {
    const heroContainer = this.shadowRoot.querySelector('.hero-container');
    const heroShadowWrapper = this.shadowRoot.querySelector('.hero-shadow-wrapper');

    if(this.getAttribute('image')) {
      heroContainer.style.background = ` linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 59%, rgba(255, 255, 255, 0.65) 100%), url(${this.getAttribute('image')}) no-repeat center center`;
      heroContainer.style.backgroundSize = 'cover';
    }
  }
}

window.customElements.define('hero-container', Hero);
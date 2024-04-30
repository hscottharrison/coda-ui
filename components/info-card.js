const infoCardTemplate = document.createElement('template');
infoCardTemplate.innerHTML = `
  <link rel="stylesheet" href="../styles/main.css" />
  <style>
    .info-card-container {
      height: 282px;
      width: 254px;
      border-bottom: 8px solid #960000;
      box-shadow: -1px 6px 5px #d9d9d9;
      position: relative;
      padding: 1em;
    }

    .title {
      color: #960000;
    }


    .plus-button {
      font-size: 32px;
      color: #960000;
      position: absolute;
      bottom: 8px;
      left: 8px;
    }

  </style>

  <div class="info-card-container">
    <span class="sub-title"></span>
    <h3 class="title"></h3>
    <span class="plus-button">+</span>
  <div>
`

class InfoCard extends HTMLElement {
  infoCardContainer;
  title;
  subTitle;
  plusButton;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(infoCardTemplate.content.cloneNode(true));
  } 

  connectedCallback() {
    // ELEMENTS
    this.infoCardContainer = this.shadowRoot.querySelector('.info-card-container');
    this.title = this.shadowRoot.querySelector('.title');
    this.plusButton = this.shadowRoot.querySelector('.plus-button');
    this.subTitle = this.shadowRoot.querySelector('.sub-title');


    this.initAttributes();
    this.initStyles();
  }

  initAttributes() {
    if(this.getAttribute('subtitle')) {
      this.subTitle.innerHTML = this.getAttribute('subtitle');
    }
    if(this.getAttribute('title')) {
      this.title.innerHTML = this.getAttribute('title');
    }
  }

  initStyles() {
    // ATTRIBUTES
    const backgroundColor = this.getAttribute('backgroundColor') || '#fff';
    const color = this.getAttribute('color') || '#000';
    const primaryColor = this.getAttribute('primaryColor') || '#fff';
    const secondaryColor = this.getAttribute('secondaryColor') || '#000';

    this.infoCardContainer.style.backgroundColor = backgroundColor;
    this.infoCardContainer.style.borderColor = primaryColor;
    this.title.style.color = primaryColor;
    this.plusButton.style.color = color;
    this.subTitle.style.color = color;

    this.infoCardContainer.addEventListener('mouseover', () => {
      this.infoCardContainer.style.backgroundColor = primaryColor;
      this.plusButton.style.color = secondaryColor;
      this.title.style.color = secondaryColor;
      this.subTitle.style.color = secondaryColor;
    });
    this.infoCardContainer.addEventListener('mouseout', () => {
      this.plusButton.style.color = color;
      this.title.style.color = primaryColor;
      this.subTitle.style.color = color;
      this.infoCardContainer.style.backgroundColor = backgroundColor;
    });
  }
}

window.customElements.define('info-card', InfoCard);
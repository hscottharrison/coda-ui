const carouselTemplate = document.createElement('template');
carouselTemplate.innerHTML = `
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
    .carousel-container {
      height: 600px;
      width: 584px;
    }

    #image-slot img {
      display: none;
      height: inherit;
      width: inherit;
      object-fit: cover;
    }

    #image-slot img[class="active"] {
      display: block;
      animation-name: fadeIn;
      animation-duration: 1.5s
    }
    @keyframes fadeIn {
      from {opacity: .8}
      to {opacity: 1}
    }

    @media screen and (max-width: 1100px) {
      .carousel-container {
        width: 100%;
      }
    }
  </style>

  <div class="carousel-container">
    <slot id="image-slot" name="image"></slot>
  <div>
`

class Carousel extends HTMLElement {
  index = 0;
  images;
  static observedAttributes = ['images'];
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(carouselTemplate.content.cloneNode(true));
  } 

  connectedCallback() {
    const images = this.shadowRoot.querySelector('slot').assignedElements();
    this.images = images;

    this.updateContent(true);
    this.startInterval();
  }


  startInterval() {
    setInterval(() => {
      if(this.index === this.images.length - 1) {
        this.index = 0;
      } else {
        this.index++;
      }
      this.updateContent();
    }, 3000)
  }

  updateContent(init) {
    if (init) {
      this.images.forEach(item => {
        item.style.display = 'none';
        item.style.height = '600px';
        item.style.width = '584px';
        item.style.objectFit = 'cover';
      });
    }

    this.images.forEach(item => {
      item.style.display = 'none';
    });
    this.images[this.index].style.display = 'block';
  }
}

window.customElements.define('coda-carousel', Carousel);
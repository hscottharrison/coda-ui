const contactNavTemplate = document.createElement('template');
contactNavTemplate.innerHTML = `
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

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

  .nav-contact {
    width: 100%;
    display: flex;
    padding: 1em 2em;
    justify-content: space-around;
    color: #fff;
  }

  .nav-container {
    height: 75px;
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
    padding-left: 1em;
  }

  .contact-item {
    display: flex;
    align-items: center;
  }

  .contact-icon {
    margin-right: 0.5em;
  }

  .logo {
    position: absolute;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    top: 1em;
  }

  .nav-items {
    width: 50%;
    display: flex;
    justify-content: space-around;
    color: #fff;
    height: 100%;
    align-items: center;
    position: absolute;
  }

  .left {
    left: 0;
  }

  .right {
    right: 0;
  }

  img {
    height: 50px;
  }

  .nav-item {
    text-decoration: none;
    color: #fff;
    padding: 0.5em;
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;;
  }

  .nav-item:after {
    content: '';
    display: block;
    border-bottom: 3px solid #fff;
    margin-top: 5px;
    width: 0;
    -webkit-transition: 0.5s ease-in;
    transition: 0.5s ease-in;
  }

  .nav-item:hover:after {
    width: 50%;
  }

  .nav-menu-icon {
    display: none;
  }

  .nav-closed{
    display: none;
  }

  .nav-close-icon-wrapper {
    color: #fff;
    font-weight: bolder;
  }

  @media screen and (max-width: 900px) {
    .nav-container {
      justify-content: space-between;
      padding: 0 2em;
    }
    .nav-items {
      display: none;
    }
    .nav-menu-icon {
      display: block;
      color: #fff;
    }

    .nav-open {
      display: block;
      visibility: visible;
      position: absolute;
      z-index: 99999999999;
      background-color: #960000;
      height: 100vh;
      width: 50%;
      top: 0;
      right: 0;
      opacity: 1;
    }

    .nav-menu-item-list {
      display: flex;
      flex-direction: column;
    }

    .nav-close-icon-wrapper {
      padding: 1em;
    }
    
    .nav-item {
      width: 50%;
    }
  }
  </style>

  <div class="nav-wrapper">
    <div class="nav-contact">
      <div class="contact-item">
        <span class="material-icons contact-icon">phone</span>
        <slot name="phoneNumber" />
      </div>
      <div class="contact-item">
        <span class="material-icons contact-icon">email</span>
        <slot name="email" />
      </div>
    </div>
    <nav class="nav-container">
      <div class="logo">
        <a href="/">
          <slot name="logo" />
        </a>
      </div>
      <div class="nav-items left">
      </div>
      <div class="nav-items right">
      </div>
      <div id="nav-menu-wrapper" class="nav-closed">
        <div class="nav-close-icon-wrapper">
          <span class="material-icons">close</span>
        </div>
        <div class="nav-menu-item-list">
        </div>
      </div>
      <div class="nav-menu-icon">
        <span class="material-icons">menu</span>
      </div>
    </nav>
  </div>
`

class ContactNav extends HTMLElement {Contact
  static observedAttributes = ['navLinks'];
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(contactNavTemplate.content.cloneNode(true));
  }
  
  connectedCallback() {
    this.initData();
    this.initStyles();
    
    this.shadowRoot.querySelector('.nav-menu-icon').addEventListener('click', () => {
      this.toggleNavMenu();  
    });
    this.shadowRoot.querySelector('.nav-close-icon-wrapper').addEventListener('click', () => {
      this.toggleNavMenu();
    });
  }

  initStyles() {
    // ATTRIBUTES
    const background = this.getAttribute('background');
    const hoverColor = this.getAttribute('hoverColor');

    // ELEMENTS
    const navContainer = this.shadowRoot.querySelector('.nav-wrapper');
    const mobileNavContainer = this.shadowRoot.querySelector('#nav-menu-wrapper');
    const navItems = this.shadowRoot.querySelectorAll('.nav-item');

    if (background) {
      navContainer.style.background = background;
      mobileNavContainer.style.background = background;
    }

    if (hoverColor) {
      const style = this.shadowRoot.querySelector('style');
      style.innerHTML += `.nav-item:after {
        content: '';
        display: block;
        border-bottom: 3px solid ${hoverColor};
        margin-top: 5px;
        width: 0;
        -webkit-transition: 0.5s ease-in;
        transition: 0.5s ease-in;
      }`

      navItems.forEach((navItem) => {
        navItem.addEventListener('mouseover', () => {
          navItem.style.color = hoverColor;
          navItem.style.fontWeight = 'bold';
        });

        navItem.addEventListener('mouseleave', () => {
          navItem.style.color = '#fff';
          navItem.style.fontWeight = 'normal';
        });
      })
    }
  }

  initData() {
    // ATTRIBUTES
    const navLinks = JSON.parse(this.getAttribute('navLinks'));
    
    // ELEMENTS
    const navItemsLeft = this.shadowRoot.querySelector('.left');
    const navItemsRight = this.shadowRoot.querySelector('.right');
    const mobileNavItems = this.shadowRoot.querySelector('.nav-menu-item-list');
    
    if(navLinks) {
      const half = navLinks.length / 2;
      navLinks.forEach((navLink, index) => {
        const item = document.createElement('a');
        item.setAttribute('href', navLink.href);
        item.classList.add('nav-item');
        item.innerHTML = navLink.label;
        if (index < half) {
          navItemsLeft.appendChild(item);
        } else {
          navItemsRight.appendChild(item);
        }
        // mobileNavItems.appendChild(item);
      });
    }
  }

  toggleNavMenu() {
    const menu = this.shadowRoot.getElementById('nav-menu-wrapper');
    if (menu.classList.contains('nav-open')) {
      menu.classList.remove('nav-open');
    } else {
      menu.classList.add('nav-open');
    }
  }
}

window.customElements.define('contact-nav', ContactNav);
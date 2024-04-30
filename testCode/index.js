const navLinks = [
  {
    label: 'About',
    href: '/'
  },
  {
    label: 'Projects',
    href: '/'
  },
  {
    label: 'Contact',
    href: '/'
  },
  {
    label: 'Services',
    href: '/'
  },
];


function initNav() {
  const contactNav = document.querySelector('contact-nav');
  contactNav.setAttribute('navLinks', JSON.stringify(navLinks));
}

function initModal() {
  const modal = document.querySelector('coda-modal');
  modal.setAttribute('scroll', window.scrollY);
}

document.querySelector('.modal-trigger').addEventListener('click', initModal);


initNav();
//| FUNCTIONS |
const getCurrentSectionIndex = (scrollOffset) => { // add throttling
  const currentOffset = window.pageYOffset;
  return sections.length - 1 - [...sections]
    .map(section => section.offset)
    .reverse()
    .findIndex(offset => currentOffset >= offset - scrollOffset);
}

const handleActiveMenuLink = (index, action) => {
  if (action === 'set') {
    menuLinks[index].classList.add('menu__link--active');
  } else if (action === 'unset') {
    menuLinks[index].classList.remove('menu__link--active');
  }
}

const pageSections = document.querySelectorAll('.section--js');
const menuLinks = document.querySelectorAll('.menu__link--js');

//| GLOBAL VARIABLES |
const sections = [...pageSections].map((section, index) => ({
  index,
  id: section.id,
  node: section,
  offset: section.offsetTop
}));

const links = [...menuLinks].map((link, index) => ({
  index,
  node: link,
  offset: link.offsetTop,
  currentSectionIndex: getCurrentSectionIndex(link.offsetTop)
}));

//| FUNCTION CALLS ON PAGE LOAD |
let currentGlobalSectionIndex = getCurrentSectionIndex(100);
// assign active menu link
handleActiveMenuLink(currentGlobalSectionIndex, 'set');
// assign colors to menu links
[...menuLinks].forEach(link => {
  link.classList.add(`menu__link--${sections[currentGlobalSectionIndex].id}`)
})

//| EVENT HANDLERS|
const handleMenu = () => {
  const updatedGlobalSectionIndex = getCurrentSectionIndex(100);
  // perform DOM manipulation when index changes
  if (updatedGlobalSectionIndex !== currentGlobalSectionIndex) {
    handleActiveMenuLink(currentGlobalSectionIndex, 'unset');
    currentGlobalSectionIndex = updatedGlobalSectionIndex;
    handleActiveMenuLink(currentGlobalSectionIndex, 'set');
  } 

  for (let i = 0; i < menuLinks.length; i++) {
    const updatedIndex = getCurrentSectionIndex(links[i].offset);
    // perform DOM manipulation when index changes
    if (updatedIndex !== links[i].currentSectionIndex) {

      links[i].currentSectionIndex = updatedIndex;
      const currentSectionId = sections[updatedIndex].id;
      menuLinks[i].className = `
        menu__link menu__link--js menu__link--${currentSectionId}
        ${i === currentGlobalSectionIndex ? 'menu__link--active' : ''}
      `;

    } else {
      continue;
    }
  }
}

//| EVENT LISTENERS |
window.addEventListener('scroll', handleMenu);
import {
  flags,
  media,
  menuObj,
  sections,
  menuItems,
  introBox,
  burgerButton,
  menuUpperBackground,
} from './variables';
import { getCurrentSectionIndex } from './navigation';

export const handleMobileHeader = (): void => {
  if (window.innerWidth >= media.lg) return;
  if (flags.isIntroMode) return;
  if (window.pageYOffset <= 0) return;

  const handleHeader = (index: number, action: string): void => {
    const currentId = sections[index].id;

    if (action === 'activate') {
      menuItems[index].classList.remove('menu__item--visible');

      introBox.classList.remove(`visuals__introBox--${currentId}`);
      burgerButton.classList.remove(`burgerButton--${currentId}`);
      menuUpperBackground.classList.remove(`visuals__background--${currentId}`);
    } else if (action === 'deactivate') {
      menuItems[index].classList.add('menu__item--visible');

      introBox.classList.add(`visuals__introBox--${currentId}`);
      burgerButton.classList.add(`burgerButton--${currentId}`);
      menuUpperBackground.classList.add(`visuals__background--${currentId}`);
    }
  };
  const newActiveSectionIndex = getCurrentSectionIndex(0);

  // when index changes
  if (newActiveSectionIndex !== menuObj.lastMenuItemIndex) {
    handleHeader(menuObj.lastMenuItemIndex, 'activate');
    menuObj.lastMenuItemIndex = newActiveSectionIndex;
    handleHeader(menuObj.lastMenuItemIndex, 'deactivate');
  }
};

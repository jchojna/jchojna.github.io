import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import menuItems from '../content/menu.json';
import menuSvg from '../assets/svg/menu.svg';

import classes from './MenuButton.module.scss';

type MenuButtonProps = {
  index: number;
  label: string;
  width: number;
  isMenuMode: boolean;
  isHovered: boolean;
  isActive?: boolean;
  offsetedSectionIndex: number;
  relativeTopOffset: number;
  setCurrentSectionIndex: (currentSectionIndex: number) => void;
  setMenuMode: (isMenuMode: boolean) => void;
};

const MenuButton = ({
  index,
  label,
  width,
  isMenuMode,
  isHovered,
  isActive,
  offsetedSectionIndex,
  relativeTopOffset,
  setCurrentSectionIndex,
  setMenuMode,
}: MenuButtonProps) => {
  const [backgroundSection, setBackgroundSection] = useState<string>('about');

  const viewBox = `0 0 ${width} 100`;
  const buttonClass = clsx({
    [classes.menuButton]: true,
    [classes[backgroundSection]]: true,
    [classes.intro]: isMenuMode,
    [classes.hovered]: isHovered,
    [classes[label]]: isHovered && isMenuMode,
    [classes.active]: isActive,
  });
  const shadowClass = clsx({
    [classes.menuSvgShadow]: true,
    [classes.visible]: !isActive,
  });
  const buttonRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!buttonRef.current) return;
    const { top } = buttonRef.current.getBoundingClientRect();
    const offset = relativeTopOffset - top;
    const index = offset >= 0 ? offsetedSectionIndex : offsetedSectionIndex + 1;
    const sections = menuItems.map(({ label }) => label);
    setBackgroundSection((prevState) =>
      prevState === sections[index] ? prevState : sections[index]
    );
  }, [relativeTopOffset]);

  const handleClick = (index: number) => {
    setCurrentSectionIndex(index);
    setMenuMode(false);
  };

  return (
    <a
      ref={buttonRef}
      href={`#${label}`}
      className={buttonClass}
      onClick={() => handleClick(index)}
    >
      <div className={classes.menuSvg}>
        <svg className={classes.menuSvgText} viewBox={viewBox}>
          <use href={`${menuSvg}#${label}`}></use>
        </svg>
        <svg className={shadowClass} viewBox={viewBox}>
          <use href={`${menuSvg}#${label}-shadow`}></use>
        </svg>
      </div>
    </a>
  );
};

export default MenuButton;

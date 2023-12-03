import clsx from 'clsx';
import { useEffect, useState } from 'react';

import menuItems from '../content/menu.json';
import MenuButton from './MenuButton';

import classes from './Menu.module.scss';

import {
  getCurrentSectionIndex,
  getOffsetedSectionIndex,
  getRelativeTopOffset,
} from '../utils/utils';

type MenuProps = {
  isMenuMode: boolean;
  setMenuMode: (isMenuMode: boolean) => void;
  sectionsRef: React.RefObject<HTMLDivElement>;
  setBackgroundSplit: (backgroundSplit: number) => void;
};

const Menu = ({
  isMenuMode,
  setMenuMode,
  sectionsRef,
  setBackgroundSplit,
}: MenuProps) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(0);
  const [indicatorTopOffset, setIndicatorTopOffset] = useState<number>(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(0);
  const [offsetedSectionIndex, setOffsetedSectionIndex] = useState<number>(-1);
  const [relativeTopOffset, setRelativeTopOffset] = useState<number>(0);

  const handleScroll = () => {
    if (!sectionsRef.current) return;
    const sectionsNodes = sectionsRef.current
      .children as HTMLCollectionOf<HTMLElement>;
    const sectionsScrolls = [...sectionsNodes].map((node) => node.offsetTop);
    const currentIndex = getCurrentSectionIndex(
      Math.ceil(sectionsRef.current.scrollTop),
      sectionsScrolls
    );
    const offsetedIndex = getOffsetedSectionIndex(
      Math.ceil(sectionsRef.current.scrollTop),
      sectionsScrolls
    );
    const offset =
      getRelativeTopOffset(
        Math.ceil(sectionsRef.current.scrollTop),
        sectionsScrolls
      ) || window.innerHeight;
    setCurrentSectionIndex((prevState) => {
      return prevState === currentIndex ? prevState : currentIndex;
    });
    setOffsetedSectionIndex((prevState) => {
      return prevState === offsetedIndex ? prevState : offsetedIndex;
    });
    setRelativeTopOffset(offset);
  };

  useEffect(() => {
    const sectionsRefCopy = sectionsRef.current;
    if (sectionsRefCopy) {
      sectionsRefCopy.addEventListener('scroll', handleScroll);
      return () => sectionsRefCopy.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const menuClass = clsx({
    [classes.menu]: true,
    [classes.intro]: isMenuMode,
  });

  return (
    <nav className={menuClass}>
      <div
        className={classes.indicator}
        style={{ top: `${indicatorTopOffset}px` }}
      ></div>
      <ul className={classes.menuList}>
        {menuItems.map(({ label, width }, index) => {
          return (
            <li
              key={index}
              className={classes.menuItem}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => !isMenuMode && setHoveredItem(null)}
              onClick={() => setMenuMode(false)}
            >
              <MenuButton
                index={index}
                label={label}
                width={width}
                isMenuMode={isMenuMode}
                isHovered={hoveredItem === index}
                isActive={currentSectionIndex === index}
                currentSectionIndex={currentSectionIndex}
                setCurrentSectionIndex={setCurrentSectionIndex}
                offsetedSectionIndex={offsetedSectionIndex}
                relativeTopOffset={relativeTopOffset}
                setIndicatorTopOffset={setIndicatorTopOffset}
                setBackgroundSplit={setBackgroundSplit}
              />
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;

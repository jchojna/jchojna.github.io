import clsx from 'clsx';

import Icon from './Icon';

import iconClasses from './Icon.module.css';
import classes from './IconsList.module.css';

const IconsList = ({ view, icons, placeholderCount = 0 }: IconsList) => {
  return (
    <ul className={classes.icons}>
      {icons.map((icon, index) => (
        <Icon key={index} view={view} details={icon} />
      ))}
      {Array.from({ length: placeholderCount }, (_, index) => (
        <li
          key={`placeholder-${index}`}
          className={clsx(iconClasses.item, iconClasses.placeholder)}
          aria-hidden
        >
          <div className={iconClasses.icon} />
        </li>
      ))}
    </ul>
  );
};

export default IconsList;

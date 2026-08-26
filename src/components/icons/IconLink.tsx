import clsx from 'clsx';

import icons from '../../assets/svg/icons.svg';
import classes from './IconLink.module.css';

type IconLink = {
  details: {
    id: string;
    name: string;
    url: string;
    ariaLabel: string;
  };
  view: string;
  large?: boolean;
};

const IconLink = ({ details, view, large = false }: IconLink) => {
  const iconClass = clsx(classes.icon, large && classes.large);
  return (
    <li className={iconClass} data-theme={view}>
      <a
        href={details.url}
        className={classes.link}
        target="_blank"
        rel="nofollow noreferrer"
        aria-label={details.ariaLabel}
      >
        <svg className={classes.svg} viewBox="0 0 200 200">
          <use href={`${icons}#${details.id}`}></use>
        </svg>
      </a>
      <span className={classes.name}>{details.name}</span>
    </li>
  );
};

export default IconLink;

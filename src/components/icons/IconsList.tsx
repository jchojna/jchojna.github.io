import Icon from './Icon';

import classes from './IconsList.module.css';

const IconsList = ({ view, icons }: IconsList) => {
  return (
    <ul className={classes.icons}>
      {icons.map((icon, index) => (
        <Icon key={index} view={view} details={icon} />
      ))}
    </ul>
  );
};

export default IconsList;

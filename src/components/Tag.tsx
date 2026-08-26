import classes from './Tag.module.css';

type TagProps = {
  projectName: string;
  label: string;
  date: string;
};

const getFormattedDate = (date: string) => new Date(date).toLocaleDateString();

const Tag = ({ projectName, label, date }: TagProps) => {
  return (
    <div className={classes.tag} data-theme={projectName}>
      <span className={classes.label}>{label}</span>
      <span className={classes.date}>{getFormattedDate(date)}</span>
    </div>
  );
};

export default Tag;

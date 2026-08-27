import classes from './BlockTitle.module.css';

const BlockTitle = ({ title, view }: BlockTitleProps) => {
  return (
    <h3 className={classes.blockTitle} data-theme={view}>
      {title}
    </h3>
  );
};

export default BlockTitle;

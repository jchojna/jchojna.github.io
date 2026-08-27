import { GridLoader } from 'react-spinners';

import classes from './Loader.module.css';

const Loader = () => {
  return (
    <div className={classes.placeholder}>
      <GridLoader color="#ffffff80" size={20} />
    </div>
  );
};

export default Loader;

import BlockTitle from '../BlockTitle';

import classes from './TextGroup.module.css';

const TextGroup = ({ title, projectName, content }: TextGroupProps) => {
  return (
    <div className={classes.textBlock} data-theme={projectName}>
      <BlockTitle title={title} view={projectName} />
      <ul className={classes.paragraphs}>
        {content.map((listItem, index) => (
          <li key={index} className={classes.paragraph}>
            {listItem}
          </li>
        ))}
      </ul>
      {/* <button
        className="tab__readMore tab__readMore--tasktimer tab__readMore--js"
      >
        Read more
      </button> */}
    </div>
  );
};

export default TextGroup;

import clsx from 'clsx';
import { useContext } from 'react';
import { useMediaQuery } from 'react-responsive';

import AccordionsGroup from '../components/AccordionsGroup';
import BlockTitle from '../components/BlockTitle';
import Graphic from '../components/Graphic';
import menuItems from '../content/menu.json';
import resume from '../content/resume.json';
import { getViewLocation } from '../utils/utils';
import CurrentViewContext from './CurrentViewContext';
import layout from '../styles/layout.module.css';
import classes from './Resume.module.css';

const Resume = () => {
  const [currentView] = useContext(CurrentViewContext);
  const isMobile = useMediaQuery({ query: '(max-width: 1200px)' });

  const { experience, education, languages } = resume;
  const { label, items } = experience;

  const viewLocation = getViewLocation(
    currentView,
    'resume',
    menuItems.map((item) => item.label)
  );

  return (
    <div id="resume" className={layout.section} data-theme="resume">
      {!isMobile && <Graphic view="resume" />}
      <div
        className={clsx(
          layout.container,
          classes.container,
          viewLocation && layout[viewLocation]
        )}
      >
        <h2 className={clsx(layout.sectionTitle, classes.title)}>
          {resume.title}
        </h2>
        <div className={classes.info}>
          <BlockTitle title={resume.info.heading} view="resume" />
          <p className={layout.normalText}>{resume.info.description}</p>
        </div>
        <div className={classes.accordions}>
          <AccordionsGroup
            accordions={items}
            title={label}
            defaultExpanded="Frontend Development"
          />
          <AccordionsGroup accordions={[education, languages]} />
        </div>
      </div>
    </div>
  );
};

export default Resume;

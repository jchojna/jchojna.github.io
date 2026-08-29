import clsx from 'clsx';
import { useContext } from 'react';

import BlockTitle from '../components/BlockTitle';
import IconLink from '../components/icons/IconLink';
import IconsList from '../components/icons/IconsList';
import about from '../content/about.json';
import contactDetails from '../content/contactDetails.json';
import menuItems from '../content/menu.json';
import { getViewLocation } from '../utils/utils';
import CurrentViewContext from './CurrentViewContext';

import layout from '../styles/layout.module.css';
import classes from './About.module.css';

const TECH_SLOT_SIZE = 7;
const TECH_COLUMN_SIZE = 5;

const getPlaceholderCount = (iconCount: number) => {
  if (iconCount === 0) return 0;
  return Math.ceil(iconCount / TECH_SLOT_SIZE) * TECH_SLOT_SIZE - iconCount;
};

const About = () => {
  const [currentView] = useContext(CurrentViewContext);

  const viewLocation = getViewLocation(
    currentView,
    'about',
    menuItems.map((item) => item.label)
  );

  return (
    <div id="about" className={layout.section} data-theme="about">
      <div
        className={clsx(
          layout.container,
          classes.container,
          viewLocation && layout[viewLocation]
        )}
      >
        <h2 className={clsx(layout.sectionTitle, classes.title)}>
          {about.title}
        </h2>

        <div className={classes.descriptionContainer}>
          <p className={clsx(layout.normalText, classes.description)}>
            {about.description}
          </p>

          <div className={classes.contactDetails}>
            {contactDetails.map((details, index) => (
              <IconLink key={index} details={details} view="about" />
            ))}
          </div>
        </div>

        <div className={classes.technologies}>
          <BlockTitle title={about.technologies.title} view="about" />
          <div className={classes.techGroups}>
            {[
              about.technologies.items.slice(0, TECH_COLUMN_SIZE),
              about.technologies.items.slice(TECH_COLUMN_SIZE),
            ].map((column, columnIndex) => (
              <div key={columnIndex} className={classes.techColumn}>
                {column.map((group) => (
                  <div key={group.label} className={classes.techGroup}>
                    <h4 className={classes.techGroupTitle}>{group.label}</h4>
                    <IconsList
                      view="about"
                      icons={group.tech}
                      placeholderCount={getPlaceholderCount(group.tech.length)}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

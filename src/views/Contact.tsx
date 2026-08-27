import clsx from 'clsx';
import { useContext } from 'react';

import IconLink from '../components/icons/IconLink';
import contactDetails from '../content/contactDetails.json';
import menuItems from '../content/menu.json';
import { getViewLocation } from '../utils/utils';
import layout from '../styles/layout.module.css';
import classes from './Contact.module.css';
import CurrentViewContext from './CurrentViewContext';

const Contact = () => {
  const [currentView] = useContext(CurrentViewContext);

  const viewLocation = getViewLocation(
    currentView,
    'contact',
    menuItems.map((item) => item.label)
  );

  return (
    <div id="contact" className={layout.section} data-theme="contact">
      <div
        className={clsx(
          layout.container,
          classes.container,
          viewLocation && layout[viewLocation]
        )}
      >
        <h2 className={clsx(layout.sectionTitle, classes.title)}>
          Looking to bring my talents to an innovative team. Let's chat!
        </h2>
        <div className={classes.contactDetails}>
          {contactDetails.map((details, index) => (
            <IconLink
              key={index}
              details={details}
              view="contact"
              large={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;

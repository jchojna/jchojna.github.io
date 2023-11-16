import clsx from 'clsx';

import Icon from '../components/Icon';
import IconLink from '../components/IconLink';

import about from '../content/about.json';
import contactDetails from '../content/contactDetails.json';

import classes from './About.module.scss';

const About = () => {
  return (
    <div id="about" className={clsx(classes.section, classes.about)}>
      <div className={clsx(classes.container, classes.about)}>
        <h2 className={clsx(classes.heading, classes.large, classes.about)}>
          {about.title}
        </h2>

        <img
          src="assets/img/photo.jpg"
          className={classes.photo}
          alt="My photo"
        />

        <section className={classes.description}>
          <p className="tab__description about">{about.description}</p>
        </section>

        <div className={classes.contactDetails}>
          {contactDetails.map((details) => (
            <IconLink details={details} view="about" />
          ))}
        </div>

        <div className={clsx(classes.iconsGroup, classes.high)}>
          <h3 className={classes.title}>{about.highLevel.title}</h3>
          <ul className={classes.icons}>
            {about.highLevel.tech.map((details) => (
              <Icon details={details} view="about" />
            ))}
          </ul>
        </div>

        <div className={clsx(classes.iconsGroup, classes.medium)}>
          <h3 className={classes.title}>{about.mediumLevel.title}</h3>
          <ul className={classes.icons}>
            {about.mediumLevel.tech.map((details) => (
              <Icon details={details} view="about" />
            ))}
          </ul>
        </div>

        <div className={clsx(classes.iconsGroup, classes.low)}>
          <h3 className={classes.title}>{about.lowLevel.title}</h3>
          <ul className={classes.icons}>
            {about.lowLevel.tech.map((details) => (
              <Icon details={details} view="about" />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;

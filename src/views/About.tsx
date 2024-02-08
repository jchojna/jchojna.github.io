import clsx from 'clsx';

import about from '../content/about.json';

import BlockTitle from '../components/BlockTitle';
import IconLink from '../components/icons/IconLink';
import IconsList from '../components/icons/IconsList';
import contactDetails from '../content/contactDetails.json';

import classes from './About.module.scss';

const About = () => {
  return (
    <div id="about" className={clsx(classes.section, classes.about)}>
      <div className={clsx(classes.container, classes.about)}>
        <h2 className={clsx(classes.title, classes.large, classes.about)}>
          {about.title}
        </h2>

        <img
          src="assets/img/photo.jpg"
          className={classes.photo}
          alt="My photo"
        />

        <p className={classes.description}>{about.description}</p>

        <div className={classes.contactDetails}>
          {contactDetails.map((details, index) => (
            <IconLink key={index} details={details} view="about" />
          ))}
        </div>

        <div className={clsx(classes.iconsGroup, classes.high)}>
          <BlockTitle title={about.highLevel.title} view="about" />
          <IconsList view="about" icons={about.highLevel.tech} />
          {/* R Shiny echarts  */}
        </div>

        <div className={clsx(classes.iconsGroup, classes.medium)}>
          <BlockTitle title={about.mediumLevel.title} view="about" />
          <IconsList view="about" icons={about.mediumLevel.tech} />
        </div>
      </div>
    </div>
  );
};

export default About;

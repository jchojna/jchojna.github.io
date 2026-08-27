import classes from './ProjectLink.module.css';

type ProjectLinkProps = {
  projectName: string;
  url: string;
  label: string;
};

const ProjectLink = ({ projectName, url, label }: ProjectLinkProps) => (
  <a
    href={url}
    className={classes.link}
    data-theme={projectName}
    target="_blank"
    rel="nofollow noreferrer"
    aria-label={`${projectName} app ${label}`}
  >
    {label}
  </a>
);

export default ProjectLink;

import { useQuery } from '@tanstack/react-query';

// gh-users snapshots
import ghUsersSnap1 from '../assets/img/ghUsers/01.webp';
import ghUsersSnap2 from '../assets/img/ghUsers/02.webp';
import ghUsersSnap3 from '../assets/img/ghUsers/03.webp';
import ghUsersSnap4 from '../assets/img/ghUsers/04.webp';
// tasktimer snapshots
import tasktimerSnap1 from '../assets/img/tasktimer/01.webp';
import tasktimerSnap2 from '../assets/img/tasktimer/02.webp';
import tasktimerSnap3 from '../assets/img/tasktimer/03.webp';
import tasktimerSnap4 from '../assets/img/tasktimer/04.webp';
// hydrapp snapshots
import hydrappSnap1 from '../assets/img/hydrapp/01.webp';
import hydrappSnap2 from '../assets/img/hydrapp/02.webp';
import hydrappSnap3 from '../assets/img/hydrapp/03.webp';
import hydrappSnap4 from '../assets/img/hydrapp/04.webp';
// portfolio snapshots
import portfolioSnap1 from '../assets/img/portfolio/01.webp';
import portfolioSnap2 from '../assets/img/portfolio/02.webp';
import portfolioSnap3 from '../assets/img/portfolio/03.webp';
import portfolioSnap4 from '../assets/img/portfolio/04.webp';
// archviz snapshots
import archvizSnap1 from '../assets/img/archviz/01.webp';
import archvizSnap2 from '../assets/img/archviz/02.webp';
import archvizSnap3 from '../assets/img/archviz/03.webp';
import archvizSnap4 from '../assets/img/archviz/04.webp';

import projects from '../content/projects.json';
import Project from './Project';

const snapshots: { [key: string]: string[] } = {
  ghUsers: [ghUsersSnap1, ghUsersSnap2, ghUsersSnap3, ghUsersSnap4],
  glob3d: [],
  tasktimer: [tasktimerSnap1, tasktimerSnap2, tasktimerSnap3, tasktimerSnap4],
  hydrapp: [hydrappSnap1, hydrappSnap2, hydrappSnap3, hydrappSnap4],
  portfolio: [portfolioSnap1, portfolioSnap2, portfolioSnap3, portfolioSnap4],
  archviz: [archvizSnap1, archvizSnap2, archvizSnap3, archvizSnap4],
};

type ProjectsProps = {
  isIntroDone: boolean;
};

const Projects = ({ isIntroDone }: ProjectsProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['reposData'],
    queryFn: () =>
      fetch(`https://api.github.com/users/jchojna/repos`).then((res) =>
        res.json()
      ),
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{`An error occured: ${error.message}`}</div>;

  return (
    <>
      {projects.map(({ name, repoName, about, features, icons }) => (
        <Project
          key={name}
          name={name}
          about={about}
          features={features}
          icons={icons}
          fetchedData={data.find((repo: RepoObj) => repo.name === repoName)}
          snapshots={snapshots[name]}
          isIntroDone={isIntroDone}
        />
      ))}
    </>
  );
};

export default Projects;

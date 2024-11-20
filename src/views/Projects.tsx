import { useQuery } from '@tanstack/react-query';

// tasktimer snapshots
import tasktimerSnap1 from '../assets/img/tasktimer/01.jpg';
import tasktimerSnap2 from '../assets/img/tasktimer/02.jpg';
import tasktimerSnap3 from '../assets/img/tasktimer/03.jpg';
import tasktimerSnap4 from '../assets/img/tasktimer/04.jpg';
// hydrapp snapshots
import hydrappSnap1 from '../assets/img/hydrapp/01.jpg';
import hydrappSnap2 from '../assets/img/hydrapp/02.jpg';
import hydrappSnap3 from '../assets/img/hydrapp/03.jpg';
import hydrappSnap4 from '../assets/img/hydrapp/04.jpg';
import hydrappSnap5 from '../assets/img/hydrapp/05.jpg';
import hydrappSnap6 from '../assets/img/hydrapp/06.jpg';
import hydrappSnap7 from '../assets/img/hydrapp/07.jpg';
// archviz snapshots
import archvizSnap1 from '../assets/img/archviz/01.jpg';
import archvizSnap2 from '../assets/img/archviz/02.jpg';
import archvizSnap3 from '../assets/img/archviz/03.jpg';
import archvizSnap4 from '../assets/img/archviz/04.jpg';
import archvizSnap5 from '../assets/img/archviz/05.jpg';
import archvizSnap6 from '../assets/img/archviz/06.jpg';
// quotes snapshots
import quotesSnap1 from '../assets/img/quotes/01.jpg';
import quotesSnap2 from '../assets/img/quotes/02.jpg';
import quotesSnap3 from '../assets/img/quotes/03.jpg';
import quotesSnap4 from '../assets/img/quotes/04.jpg';

import projects from '../content/projects.json';
import Project from './Project';

const snapshots: { [key: string]: string[] } = {
  ghUsers: [],
  glob3d: [],
  tasktimer: [tasktimerSnap1, tasktimerSnap2, tasktimerSnap3, tasktimerSnap4],
  hydrapp: [
    hydrappSnap1,
    hydrappSnap2,
    hydrappSnap3,
    hydrappSnap4,
    hydrappSnap5,
    hydrappSnap6,
    hydrappSnap7,
  ],
  portfolio: [],
  archviz: [
    archvizSnap1,
    archvizSnap2,
    archvizSnap3,
    archvizSnap4,
    archvizSnap5,
    archvizSnap6,
  ],
  quotes: [quotesSnap1, quotesSnap2, quotesSnap3, quotesSnap4],
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

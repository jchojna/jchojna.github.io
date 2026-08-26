import clsx from 'clsx';
import { Carousel, useCarousel } from 'nuka-carousel';

import classes from './ProjectCarousel.module.css';

type ProjectCarouselProps = {
  snapshots: string[];
};

const CarouselArrows = () => {
  const { currentPage, totalPages, goBack, goForward } = useCarousel();

  return (
    <>
      <button
        aria-label="Previous slide"
        className={clsx(classes.navButton, classes.previous)}
        disabled={currentPage === 0}
        onClick={goBack}
        type="button"
      >
        <span className={clsx(classes.arrow, classes.left)} />
      </button>
      <button
        aria-label="Next slide"
        className={clsx(classes.navButton, classes.next)}
        disabled={currentPage >= totalPages - 1}
        onClick={goForward}
        type="button"
      >
        <span className={clsx(classes.arrow, classes.right)} />
      </button>
    </>
  );
};

const ProjectCarousel = ({ snapshots }: ProjectCarouselProps) => {
  return (
    <div className={classes.projectCarousel}>
      {snapshots.length > 0 && (
        <Carousel
          arrows={<CarouselArrows />}
          showArrows="always"
        >
          {snapshots.map((img, index) => (
            <img alt="" key={index} src={img} />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default ProjectCarousel;

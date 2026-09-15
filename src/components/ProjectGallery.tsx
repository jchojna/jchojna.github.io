import { type PointerEvent, useEffect, useMemo, useRef, useState } from 'react';

import classes from './ProjectGallery.module.css';

const GALLERY_SIZE = 4;
const MAX_TILT = 16;

type ProjectGalleryProps = {
  demoUrl: string;
  projectName: string;
  snapshots: string[];
};

type ProjectImageProps = {
  demoUrl: string;
  image: string;
  index: number;
  projectName: string;
};

const ProjectImage = ({
  demoUrl,
  image,
  index,
  projectName,
}: ProjectImageProps) => {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin: '150px 0px', threshold: 0.01 }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== 'mouse') return;

    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    card.style.setProperty('--rotate-x', `${-y * MAX_TILT}deg`);
    card.style.setProperty('--rotate-y', `${x * MAX_TILT}deg`);
  };

  const resetTilt = (event: PointerEvent<HTMLAnchorElement>) => {
    event.currentTarget.style.removeProperty('--rotate-x');
    event.currentTarget.style.removeProperty('--rotate-y');
  };

  return (
    <a
      aria-label={`Open ${projectName} demo, screenshot ${index + 1}`}
      className={classes.card}
      data-loaded={isLoaded}
      href={demoUrl}
      onPointerLeave={resetTilt}
      onPointerMove={handlePointerMove}
      ref={containerRef}
      rel="nofollow noreferrer"
      target="_blank"
    >
      {isVisible && (
        <img
          alt={`${projectName} project screenshot ${index + 1}`}
          className={isLoaded ? classes.loaded : undefined}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          src={image}
        />
      )}
    </a>
  );
};

const ProjectGallery = ({
  demoUrl,
  projectName,
  snapshots,
}: ProjectGalleryProps) => {
  const images = useMemo(
    () =>
      Array.from(
        { length: snapshots.length === 0 ? 0 : GALLERY_SIZE },
        (_, index) => snapshots[index % snapshots.length]
      ),
    [snapshots]
  );

  if (images.length === 0) return null;

  return (
    <div className={classes.gallery}>
      {images.map((image, index) => (
        <ProjectImage
          demoUrl={demoUrl}
          image={image}
          index={index}
          key={`${image}-${index}`}
          projectName={projectName}
        />
      ))}
    </div>
  );
};

export default ProjectGallery;

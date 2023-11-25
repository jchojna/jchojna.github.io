import clsx from 'clsx';

import { useEffect, useRef } from 'react';

import classes from './Accordion.module.scss';

const Accordion = ({
  label,
  children,
  view,
  isSmall,
  isExpanded,
  setExpanded,
}: AccordionProps) => {
  const accordionRef = useRef<HTMLDivElement | null>(null);
  const accordionLabelRef = useRef<HTMLButtonElement | null>(null);
  const accordionItemsRef = useRef<HTMLDivElement | null>(null);
  const accordionClass = clsx(
    classes.accordion,
    isSmall && classes.small,
    classes[view]
  );

  useEffect(() => {
    // collapse all accordions on start
    if (accordionLabelRef.current !== null && accordionRef.current !== null) {
      const labelHeight = accordionLabelRef.current.clientHeight;
      accordionRef.current.style.height = `${labelHeight}px`;
    }
  }, []);

  useEffect(() => {
    if (
      accordionLabelRef.current === null ||
      accordionItemsRef.current === null ||
      accordionRef.current === null
    )
      return;
    const labelHeight = accordionLabelRef.current.clientHeight;
    const itemsHeight = accordionItemsRef.current.clientHeight;
    accordionRef.current.style.height = !isExpanded
      ? `${labelHeight}px`
      : `${labelHeight + itemsHeight + 20}px`;
  }, [isExpanded]);

  return (
    <div ref={accordionRef} className={accordionClass}>
      <button
        ref={accordionLabelRef}
        className={classes.label}
        onClick={() => setExpanded(isExpanded ? null : label)}
      >
        {label}
      </button>
      <div ref={accordionItemsRef} className={classes.items}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;

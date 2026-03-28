import { use, useEffect, useRef, useState } from "react";
import { animate, spring } from "animejs";

function RowSelect(props: {
  options: string[];
  selected: number;
  onSelectedChange: (index: number) => void;
}) {

  const containerRef = useRef<HTMLDivElement | null>(null);
  const pillRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const hoverItemRef = useRef<number | null>(null);
  const selectedRef = useRef(props.selected);

  useEffect(() => {
    const currentItem = itemsRef.current[props.selected];
    
    if(!currentItem || !pillRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const itemRect = currentItem.getBoundingClientRect();

    pillRef.current.style.width = `${itemRect.width}px`;
    pillRef.current.style.height = `${itemRect.height}px`;
    pillRef.current.style.left = `${itemRect.left - containerRect.left}px`;
  },[]);

  useEffect(() => {
    selectedRef.current = props.selected;
  }, [props.selected]);

  useEffect(() => {
    if (!containerRef.current || !itemsRef.current[selectedRef.current] || !pillRef.current) return;
    let frameId = 0;

    const observer = new ResizeObserver(() => {
        const itemRect = itemsRef.current[selectedRef.current]!.getBoundingClientRect();

        cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(() => { pillRef.current!.style.width = `${itemRect.width}px`; pillRef.current!.style.left = `${itemRect.left - containerRef.current!.getBoundingClientRect().left}px` });
    });

    observer.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, []);
  
  const animateToIndex = (index: number, duration: number = 300) => {
    const targetItem = itemsRef.current[index];

    if(!targetItem || !pillRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const itemRect = targetItem.getBoundingClientRect();

    animate(pillRef.current, {
      left: itemRect.left - containerRect.left,
      width: itemRect.width,
      duration,
      ease: spring({
        bounce: 0.4,
        duration: 300
      })
    });

  };

  const handleMouseEnter = (index: number) => {
    if (index === selectedRef.current) return;
    hoverItemRef.current = index;
    animateToIndex(index, 100);
  };

  const handleMouseLeave = () => {
    hoverItemRef.current = null;
    animateToIndex(selectedRef.current, 400);
  };


  return (
    <div className="row-select" ref={containerRef}>
      <div className="row-select-pill" ref={pillRef} />

      {props.options.map((option, index) => (
        <button
          key={index}
          className={
            "row-select-item " + (index === props.selected ? "is-selected" : "")
          }
          ref={el => {itemsRef.current[index] = el}}
          onClick={() => {animateToIndex(index, 200 * (Math.abs(index - props.selected) + 1));props.onSelectedChange(index)}}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          type="button"
        >
          <p>{option}</p>
        </button>
      ))}
    </div>
  );
}

export default RowSelect;

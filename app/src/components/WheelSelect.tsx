import { useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import { animate } from 'animejs';

function normalizeAngle(angle: number) {
  return ((angle % 360) + 360) % 360;
}

function clampAngleDelta(delta: number) {
  if (delta > 180) return delta - 360;
  if (delta < -180) return delta + 360;
  return delta;
}

function WheelSelect(props:{ options: string[], selected: number, onSelectedChange: (index: number) => void }) {
  const [rotation, setRotation] = useState(180);

  const dragState = useRef<{
    pointerId: number;
    startAngle: number;
    startRotation: number;
    startX: number;
    startY: number;
  } | null>(null);

  const navRef = useRef<HTMLElement | null>(null);
  const animRef = useRef<ReturnType<typeof animate> | null>(null);
  const rawRotation = useRef(180);

  const step = 360 / props.options.length;

  const cancelAnimation = () => {
    if (animRef.current) {
      animRef.current.pause();
      animRef.current = null;
    }
  };

  const getAngleFromPointerEvent = (event: ReactPointerEvent) => {
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      const centerX = rect.x + rect.width;
      const centerY = rect.y + (rect.height / 2);
      return Math.atan2(event.clientY - centerY, event.clientX - centerX) * (180 / Math.PI);
    }
    return 0;
  };

  const handlePointerDown = (event: ReactPointerEvent) => {
    cancelAnimation();
    if (navRef.current) {
      const startAngle = getAngleFromPointerEvent(event);
      dragState.current = {
        pointerId: event.pointerId,
        startAngle,
        startRotation: rotation,
        startX: event.clientX,
        startY: event.clientY,
      };
    }
  };

  const handlePointerMove = (event: ReactPointerEvent) => {
    if (dragState.current && event.pointerId === dragState.current.pointerId && navRef.current) {

      if(!navRef.current.hasPointerCapture(event.pointerId)){
        navRef.current.setPointerCapture(event.pointerId);
      }

      const currentAngle = getAngleFromPointerEvent(event);
      const angleDelta = clampAngleDelta(currentAngle - dragState.current.startAngle);
      const newRotation = normalizeAngle(dragState.current.startRotation + angleDelta);
      setRotation(newRotation);
    }
  };

  const handlePointerCancel = (event: ReactPointerEvent) =>{
    if (dragState.current && event.pointerId === dragState.current.pointerId && navRef.current) {
     if( navRef.current.hasPointerCapture(event.pointerId)){
        navRef.current.releasePointerCapture(event.pointerId);
      }
      dragState.current = null;
    }
  }

  const handlePointerUp = (event: ReactPointerEvent) => {
    if (dragState.current && event.pointerId === dragState.current.pointerId && navRef.current) {

      if(navRef.current.hasPointerCapture(event.pointerId)){
        navRef.current.releasePointerCapture(event.pointerId);
      }

      const currentAngle = getAngleFromPointerEvent(event);
      const angleDelta = clampAngleDelta(currentAngle - dragState.current.startAngle);
      const newRotation = normalizeAngle(dragState.current.startRotation + angleDelta);
      setRotation(newRotation);
      rawRotation.current = newRotation;
      dragState.current = null;

      snapToNearestOption();
    }};

  const snapToNearestOption = () => {

      const nearestIndex = props.options.reduce((nearest: number, _: string, index: number) => {
        const optionAngle = Math.abs(180 - normalizeAngle(index * step + rotation ));
        const bestOptionAngle = Math.abs(180 - normalizeAngle(nearest * step + rotation));
        return optionAngle < bestOptionAngle ? index : nearest;
      }, 0);
      //props.onSelectedChange(nearestIndex);
      // const angleToNearest = normalizeAngle(180 - nearestIndex * step);
      // setRotation(angleToNearest);
      handleOptionClick(nearestIndex);
      
  };

  const handleOptionClick = (index: number) => {
    cancelAnimation();

    const targetNormalized = normalizeAngle(180 - index * step);
    const delta = clampAngleDelta(targetNormalized - normalizeAngle(rawRotation.current));

    if (Math.abs(delta) < 0.5) {
      props.onSelectedChange(index);
      return;
    }

    const target = rawRotation.current + delta;
    const animTarget = { value: rawRotation.current };

    animRef.current = animate(animTarget, {
      value: target,
      duration: 520,
      easing: 'easeOutExpo',
      onUpdate() {
        rawRotation.current = animTarget.value;
        setRotation(animTarget.value);
      },
      onComplete() {
        const normalized = normalizeAngle(animTarget.value);
        rawRotation.current = normalized;
        setRotation(normalized);
        animRef.current = null;
      },
    });

    props.onSelectedChange(index);
  };


  return (
    <nav
      className="wheel-nav"
      onPointerCancel={handlePointerCancel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      ref={navRef}
    >
      <div className="wheel" >
        {props.options.map((option, index) => {
          const angle = index * step + rotation;
          const isSelected = index === props.selected;

          return (
            <button
              className={`wheel-option ${isSelected ? 'is-selected' : ''}`}
              key={option}
              style={{ '--item-angle': `${angle}deg` } as CSSProperties}
              type="button"
              onClick={() => handleOptionClick(index)}
            >
              <p>{option}</p>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default WheelSelect;
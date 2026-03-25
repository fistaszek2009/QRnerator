import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'

function normalizeAngle(angle: number) {
  return ((angle % 360) + 360) % 360;
}

function clampAngleDelta(delta: number) {
  if (delta > 180) {
    return delta - 360;
  }

  if (delta < -180) {
    return delta + 360;
  }

  return delta;
}

function WheelSelect(props:{ options: string[], selected: number, onSelectedChange: (index: number) => void }) {
  
  const dragState = useRef<{
    pointerId: number;
    startAngle: number;
    startRotation: number;
    startX: number;
    startY: number;
  } | null>(null);

  const navRef = useRef<HTMLElement | null>(null);
  const [rotation, setRotation] = useState(180);

  const step = 360 / props.options.length;

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
      dragState.current = null;

      snapToNearestOption();
    }};

  const snapToNearestOption = () => {

      const nearestIndex = props.options.reduce((nearest: number, _: string, index: number) => {
        const optionAngle = Math.abs(180 - normalizeAngle(index * step + rotation ));
        const bestOptionAngle = Math.abs(180 - normalizeAngle(nearest * step + rotation));
        return optionAngle < bestOptionAngle ? index : nearest;
      }, 0);
      props.onSelectedChange(nearestIndex);
      const angleToNearest = normalizeAngle(180 - nearestIndex * step);
      setRotation(angleToNearest);
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
              onClick={() => {props.onSelectedChange(index);setRotation(normalizeAngle(180 - index * step))}}
            >
              <p>{option}</p>
            </button>
          );
        })}
      </div>

      <div className="wheel-nav__value">
          {props.options[props.selected]}
      </div>
    </nav>
  );
}

export default WheelSelect;
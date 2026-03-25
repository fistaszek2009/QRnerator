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

function WheelSelect(props:{ options: string[] }) {
  const [rotation, setRotation] = useState(180);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const dragState = useRef<{
    pointerId: number;
    startAngle: number;
    startRotation: number;
  } | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const step = 360 / props.options.length;

  return (
    <nav
      className="wheel-nav"
      // onPointerCancel={handlePointerCancel}
      // onPointerDown={handlePointerDown}
      // onPointerMove={handlePointerMove}
      // onPointerUp={handlePointerUp}
      ref={navRef}
    >
      <div className="wheel" >
        {props.options.map((option, index) => {
          const angle = index * step + rotation;
          const isSelected = index === selectedIndex;

          return (
            <button
              className={`wheel-option ${isSelected ? 'is-selected' : ''}`}
              key={option}
              style={{ '--item-angle': `${angle}deg` } as CSSProperties}
              type="button"
            >
              <p>{option}</p>
            </button>
          );
        })}
      </div>

      <div className="wheel-nav__value">
          {props.options[selectedIndex]}
      </div>
      {/* <input id="type-picker" name="type" type="hidden" value={props.options[selectedIndex].toLowerCase()} /> */}
    </nav>
  );
}

export default WheelSelect
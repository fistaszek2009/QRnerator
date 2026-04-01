import type { RefObject } from "react";
import { useState, useEffect } from "react";
import ColorInput from "./ColorInput"
import Input from "./Input";

import type QRCodeStyling from "qr-code-styling";
import type { Options } from "qr-code-styling";
import { DEFAULTS_STYLE } from "../utils/types";

export default function StyleForm(props:{
  codeData: RefObject<QRCodeStyling | null>;
  visible: Boolean;
}) {

  const dotsOptions = ['rounded', 'dots', 'classy', 'classy-rounded', 'square', 'extra-rounded'].map(value => ({ label: value.charAt(0).toUpperCase() + value.slice(1), value }));
  const cornersOptions = ['dot', 'square', 'extra-rounded', 'rounded', 'dots', 'classy', 'classy-rounded'].map(value => ({ label: value.charAt(0).toUpperCase() + value.slice(1), value }));
  const eyeOptions = ['dot', 'square', 'extra-rounded', 'rounded', 'dots', 'classy', 'classy-rounded'].map(value => ({ label: value.charAt(0).toUpperCase() + value.slice(1), value }));

  const [styleOptions, setStyleOptions] = useState<Options>({...DEFAULTS_STYLE});

  //type shapeOptions = 'dotsOptions' | 'cornersSquareOptions' | 'cornersDotOptions';

  const updateField = <T extends keyof Options, K extends keyof Options[T]>(
    type: T,
    field: K,
    value: Options[T][K]
  ) => {
    setStyleOptions(prev => ({
      ...prev,
      [type]: { ...prev[type], [field]: value }
    }));
  };

  useEffect(() => {
    props.codeData.current?.update({...styleOptions});
  }, [styleOptions, props.codeData]);

  return (
    <div className="form" style={{ display: props.visible ? 'flex' : 'none' }}>
      <div className="form-section">
        <h3>Dots</h3>
        <Input 
          label="Shape" 
          as='select' 
          value={styleOptions.dotsOptions?.type || 'square'} 
          options={dotsOptions} onChange={(e)=>updateField('dotsOptions', 'type', e.target.value)}
        />
        <ColorInput label="Color" value="#ffd84e" />
      </div>

      <div className="form-section">
        <h3>Corners Squares</h3>
          <Input 
              label="Shape" 
              as='select' 
              value={styleOptions.cornersSquareOptions?.type || 'square'} 
              options={cornersOptions} onChange={(e)=>updateField('cornersSquareOptions', 'type', e.target.value)}
            />
        <ColorInput label="Color" value="#ffd84e" />
      </div>

      <div className="form-section">
        <h3>Corners Dots</h3>
       <Input 
            label="Shape" 
            as='select' 
            value={styleOptions.cornersDotOptions?.type || 'square'} 
            options={cornersOptions} onChange={(e)=>updateField('cornersDotOptions', 'type', e.target.value)}
        />
        <ColorInput label="Color" value="#ffd84e" />
      </div>

      <div className="form-section">
        <h3>Background</h3>
        <ColorInput label="Color" value="#ffffff" />
      </div>
    </div>
  );
}

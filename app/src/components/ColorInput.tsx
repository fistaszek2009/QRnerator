import type { ChangeEvent } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import RowSelect from "./RowSelect";
import Input from "./Input";

type Props = {
  label?: string;
  hint?: string;
  className?: string;
  value?: string;
  placeholder?: string;
  options?: never;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

type FieldProps = Props ;

export default function ColorInput({
  label,
  hint,
  className = "",
  ...props
}: FieldProps) {
    const [opened, setOpened] = useState(false);
    const [type, setType] = useState(0);

  const fieldClassName = `form-input form-input-color-frame ${className ? ` ${className}` : ""}`;

  return (
    <div className={fieldClassName}>
      {label ? <label className="form-input-label">{label}</label> : null}
        <div className={`form-input-control ${opened ? 'form-input-color-opened' : ''}`} onClick={!opened ? () => setOpened(true) : undefined}>
            { !opened ?
                <>
                    <span className="form-input-color-preview" style={{ backgroundColor: props.value }}></span>
                    <p>{type === 0 ? 'Color' : 'Gradient'}: {props.value}</p>
                </> :
                <>
                    <FontAwesomeIcon className="x" icon="xmark" size='lg' onClick={() => setOpened(prev => !prev)} />
                    <RowSelect
                        options={['Single', 'Gradient']}
                        selected={type}
                        onSelectedChange={setType}
                    />
                    {type === 0 ? 
                         <div className="input-section">
                        <Input label='Color' placeholder='#ffffff' value={props.value} onChange={props.onChange} />
                        </div>
                     : 
                        <>
                            <div className="input-section">
                                <Input label='Color 1' placeholder='#ffffff' value={props.value} onChange={props.onChange} />
                                <Input label='Color 2' placeholder='#000000' value={props.value} onChange={props.onChange} />
                            </div>
                            <div className="input-section">
                                <Input label='Gradient type' as='select' options={[{ value: 'linear', label: 'Linear' }, { value: 'radial', label: 'Radial' }]} value={'linear'} onChange={()=>{}} />
                                <Input label='Rotation' inputType='range' value='300' placeholder={props.placeholder} onChange={props.onChange} />
                            </div>
                        </>
                     }
                </>    
            }
        </div>
      {hint ? <p className="form-input-hint">{hint}</p> : null}
    </div>
  );
}

import ColorInput from "./ColorInput"
import Input from "./Input";

export default function StyleForm() {
  const dotsOptions = [{ label: 'Square', value: 'square' }, { label: 'Dot', value: 'dot' }, { label: 'Extra Rounded', value: 'extra-rounded' }, { label: 'Semi Rounded', value: 'semi-rounded' }];
  const cornersOptions = [{ label: 'Square', value: 'square' }, { label: 'Dot', value: 'dot' }, { label: 'Extra Rounded', value: 'extra-rounded' }, { label: 'Semi Rounded', value: 'semi-rounded' }];
  const eyeOptions = [{ label: 'Square', value: 'square' }, { label: 'Dot', value: 'dot' }, { label: 'Semi Rounded', value: 'semi-rounded' }];

  return (
    <div className="form">
      <div className="form-section">
        <h3>Dots</h3>
        {/* <RowSelect
          label="Shape"
          options={dotsOptions}
          selected={0}
          onSelectedChange={() => {}}
        /> */}
        <Input label="Shape" as='select' value={dotsOptions[0].value} options={dotsOptions} />
        <ColorInput label="Color" value="#ffd84e" />
      </div>

      <div className="form-section">
        <h3>Corners Squares</h3>
          {/* <RowSelect
            label="Shape"
            options={cornersOptions}
            selected={0}
            onSelectedChange={() => {}}
          /> */}
          <Input label="Shape" as='select' value={cornersOptions[0].value} options={cornersOptions} />
        <ColorInput label="Color" value="#ffd84e" />
      </div>

      <div className="form-section">
        <h3>Corners Dots</h3>
        {/* <RowSelect
          label="Shape"
          options={eyeOptions}
          selected={0}
          onSelectedChange={() => {}}
        /> */}
        <Input label="Shape" as='select' value={eyeOptions[0].value} options={eyeOptions} />
        <ColorInput label="Color" value="#ffd84e" />
      </div>
    </div>
  );
}

import Input from "./Input";

export default function DataForm(props: {
  typeOptions: string[];
  typeIndex: number;
  codeData: { data: string };
}) {

  const selectedType = props.typeOptions[props.typeIndex];

  const updateValue = (value: string) => {
    props.codeData.data = value;
  };

  return (
    <div className="form">

      {selectedType === "URL" ? (
        <Input
          inputType="url"
          label="URL"
          placeholder="https://example.com"
          value={props.codeData.data}
          onChange={(e) => updateValue(e.target.value)}
        />
      ) : null}

      {selectedType === "Text" ? (
        <Input
          as="textarea"
          label="Text"
          placeholder="Text..."
          value={props.codeData.data}
          onChange={(e) => updateValue(e.target.value)}
        />
      ) : null}

      {selectedType === "Email" ? (
        <>
          <Input
            inputType="email"
            label="Email"
            placeholder="example@domain.com"
            value={props.codeData.data}
            onChange={(e) => updateValue(e.target.value)}
          />
          <Input
            inputType="text"
            label="Email Subject (optional)"
            placeholder="Subject..."
            value={props.codeData.data}
            onChange={(e) => updateValue(e.target.value)}
          />
          <Input
            as="textarea"
            label="Email Content (optional)"
            placeholder="Email content..."
            value={props.codeData.data}
            onChange={(e) => updateValue(e.target.value)}
          />
        </>
      ) : null}

      {selectedType === "Phone" ? (
        <Input
          inputType="tel"
          label="Phone"
          placeholder="+12 345 678 901"
          value={props.codeData.data}
          onChange={(e) => updateValue(e.target.value)}
        />
      ) : null}

      {selectedType === "SMS" ? (
        <>
          <Input
            inputType="tel"
            label="Phone"
            placeholder="+12 345 678 901"
            value={props.codeData.data}
            onChange={(e) => updateValue(e.target.value)}
          />
          <Input
            inputType="text"
            label="SMS content (optional)"
            placeholder="SMS content..."
            value={props.codeData.data}
            onChange={(e) => updateValue(e.target.value)}
          />
        </>
      ) : null}

      {selectedType === "vCard" ? (
        <>
          <Input
            inputType="text"
            label="First and Last Name"
            placeholder="John Doe"
            value={props.codeData.data}
            onChange={(e) => updateValue(e.target.value)}
          />
          <Input
            inputType="text"
            label="Company/Job title"
            placeholder="ABC Company / CEO"
            value={props.codeData.data}
            onChange={(e) => updateValue(e.target.value)}
          />
          <Input
            inputType="tel"
            label="Phone number"
            placeholder="+12 345 678 901"
            value={props.codeData.data}
            onChange={(e) => updateValue(e.target.value)}
          />
          <Input
            inputType="email"
            label="Email"
            placeholder="example@domain.com"
            value={props.codeData.data}
            onChange={(e) => updateValue(e.target.value)}
          />
          <Input
            inputType="url"
            label="Website (optional)"
            placeholder="https://example.com"
            value={props.codeData.data}
            onChange={(e) => updateValue(e.target.value)}
          />
        </>
      ) : null}

      {selectedType === "Wi-Fi" ? (
        <>
          <Input
            inputType="text"
            label="Network Name (SSID)"
            placeholder="Network name..."
            value={props.codeData.data}
            onChange={(e) => updateValue(e.target.value)}
          />
          <Input
            inputType="text"
            label="Password"
            placeholder="Password..."
            value={props.codeData.data}
            onChange={(e) => updateValue(e.target.value)}
          />
          <Input
            as="select"
            label="Encryption"
            value={props.codeData.data}
            options={[
              { value: "WPA", label: "WPA/WPA2" },
              { value: "WEP", label: "WEP" },
              { value: "nopass", label: "No Password" },
            ]}
            onChange={(e) => updateValue(e.target.value)}
          />
          <Input
            inputType="checkbox"
            label="Hidden Network"
            checked={props.codeData.data === "true"}
            onChange={(e) => updateValue(e.target.checked ? "true" : "false")}
          />
        </>
      ) : null}

      <Input
        inputType="range"
        label="Image Margin"
        value="300"
        onChange={() => undefined}
      />

      <Input
        inputType="range"
        label="Export Size"
        value="300"
        onChange={() => undefined}
      />

      <Input inputType="file" label="Middle Icon" onChange={() => undefined} />
    </div>
  );
}

import type { RefObject } from "react";
import { use, useEffect, useState } from "react";
import Input from "./Input";
import QRCodeStyling from "qr-code-styling";

import { returnDefaultValues, decodeQrData, encodeQrUrl, encodeQrText} from "../utils/codeData";

export default function DataForm(props: {
  typeOptions: string[];
  typeIndex: number;
  codeData: RefObject<QRCodeStyling | null>;
}) {

  const selectedType = props.typeOptions[props.typeIndex];

  //********
  //********
  //********
  // ZMIENIĆ BO TO NIEBEZPIECZNE JAKBY SIE ZMIENIŁ!!!
  const code = props.codeData.current;
  //********
  //********
  //********

  const [codeData, setCodeData] = useState("");

  useEffect(() => {
    const value =
      codeData.trim() === ""
        ? returnDefaultValues(props.typeIndex)
        : codeData;

    code?.update({
      data: value,
    });
  }, [codeData, props.typeIndex]);

  useEffect(() => {
    setCodeData("");
  }, [props.typeIndex]);

  return (
    <div className="form">

      {selectedType === "URL" ? (
        <Input
          inputType="url"
          label="URL"
          placeholder="https://example.com"
          value={decodeQrData(props.typeIndex, codeData)}
          onChange={(e) => encodeQrUrl(e.target.value, setCodeData)}
        />
      ) : null}

      {selectedType === "Text" ? (
        <Input
          as="textarea"
          label="Text"
          placeholder="Text..."
          value={decodeQrData(props.typeIndex, codeData)}
          onChange={(e) => encodeQrText(e.target.value, setCodeData)}
        />
      ) : null}

      {selectedType === "Email" ? (
        <>
          <Input
            inputType="email"
            label="Email"
            placeholder="example@domain.com"
            value={''}
            onChange={() => {}}
          />
          <Input
            inputType="text"
            label="Email Subject (optional)"
            placeholder="Subject..."
            value={''}
            onChange={() => {}}
          />
          <Input
            as="textarea"
            label="Email Content (optional)"
            placeholder="Email content..."
            value={''}
            onChange={() => {}}
          />
        </>
      ) : null}

      {selectedType === "Phone" ? (
        <Input
          inputType="tel"
          label="Phone"
          placeholder="+12 345 678 901"
          value={''}
          onChange={() => {}}
        />
      ) : null}

      {selectedType === "SMS" ? (
        <>
          <Input
            inputType="tel"
            label="Phone"
            placeholder="+12 345 678 901"
            value={''}
            onChange={() => {}}
          />
          <Input
            inputType="text"
            label="SMS content (optional)"
            placeholder="SMS content..."
            value={''}
            onChange={() => {}}
          />
        </>
      ) : null}

      {selectedType === "vCard" ? (
        <>
          <Input
            inputType="text"
            label="First and Last Name"
            placeholder="John Doe"
            value={''}
            onChange={() => {}}
          />
          <Input
            inputType="text"
            label="Company/Job title"
            placeholder="ABC Company / CEO"
            value={''}
            onChange={() => {}}
          />
          <Input
            inputType="tel"
            label="Phone number"
            placeholder="+12 345 678 901"
            value={''}
            onChange={() => {}}
          />
          <Input
            inputType="email"
            label="Email"
            placeholder="example@domain.com"
            value={''}
            onChange={() => {}}
          />
          <Input
            inputType="url"
            label="Website (optional)"
            placeholder="https://example.com"
            value={''}
            onChange={() => {}}
          />
        </>
      ) : null}

      {selectedType === "Wi-Fi" ? (
        <>
          <Input
            inputType="text"
            label="Network Name (SSID)"
            placeholder="Network name..."
            value={''}
            onChange={() => {}}
          />
          <Input
            inputType="text"
            label="Password"
            placeholder="Password..."
            value={''}
            onChange={() => {}}
          />
          <Input
            as="select"
            label="Encryption"
            value={''}
            options={[
              { value: "WPA", label: "WPA/WPA2" },
              { value: "WEP", label: "WEP" },
              { value: "nopass", label: "No Password" },
            ]}
            onChange={() => {}}
          />
          <Input
            inputType="checkbox"
            label="Hidden Network"
            checked={false}
            onChange={() => {}}
          />
        </>
      ) : null}

      <Input
        inputType="range"
        label="Code Margin"
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

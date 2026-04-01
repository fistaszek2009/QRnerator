import type { RefObject } from "react";
import { useEffect, useState } from "react";
import Input from "./Input";
import QRCodeStyling from "qr-code-styling";

import type { FormDataMap, QrType } from "../utils/types";
import { DEFAULTS_DATA } from "../utils/types";
import { returnDefaultValues, encodeQrData } from "../utils/codeData";


export default function DataForm(props: {
  typeOptions: readonly QrType[];
  typeIndex: number;
  codeData: RefObject<QRCodeStyling | null>;
  setExportSize: (size: number) => void;
  visible:Boolean;
}) {

  const selectedType = props.typeOptions[props.typeIndex];
  const [margin, setMargin] = useState(10);
  const [exportSize, setExportSize] = useState(300);
  const [formData, setFormData] = useState<FormDataMap>({ ...DEFAULTS_DATA });

  const updateField = <T extends QrType, K extends keyof FormDataMap[T]>(
    type: T,
    field: K,
    value: FormDataMap[T][K]
  ) => {
    setFormData(prev => ({
      ...prev,
      [type]: { ...prev[type], [field]: value }
    }));
  };

  useEffect(() => {
    const encoded = encodeQrData(selectedType, formData[selectedType]);
    props.codeData.current?.update({ data: (encoded || returnDefaultValues(selectedType)) });
    console.log(props.codeData.current?._options.data);
  }, [formData, selectedType, props.codeData]);

  useEffect(() => {
    props.codeData.current?.update({
      margin: margin,
    });
  }, [margin]);

  return (
    <div className="form" style={{ display: props.visible ? 'flex' : 'none' }}>

      {selectedType === "URL" ? (
        <Input
          inputType="url"
          label="URL"
          placeholder="https://example.com"
          value={formData.URL.url}
          onChange={(e) => updateField("URL", "url", e.target.value)}
        />
      ) : null}

      {selectedType === "Text" ? (
        <Input
          as="textarea"
          label="Text"
          placeholder="Text..."
          value={formData.Text.text}
          onChange={(e) => updateField("Text", "text", e.target.value)}
        />
      ) : null}

      {selectedType === "Email" ? (
        <>
          <Input
            inputType="email"
            label="Email"
            placeholder="example@domain.com"
            value={formData.Email.email}
            onChange={(e) => updateField("Email", "email", e.target.value)}
          />
          <Input
            inputType="text"
            label="Email Subject (optional)"
            placeholder="Subject..."
            value={formData.Email.subject}
            onChange={(e) => updateField("Email", "subject", e.target.value)}
          />
          <Input
            as="textarea"
            label="Email Content (optional)"
            placeholder="Email content..."
            value={formData.Email.body}
            onChange={(e) => updateField("Email", "body", e.target.value)}
          />
        </>
      ) : null}

      {selectedType === "Phone" ? (
        <Input
          inputType="tel"
          label="Phone"
          placeholder="+12 345 678 901"
          value={formData.Phone.phone}
          onChange={(e) => updateField("Phone", "phone", e.target.value)}
        />
      ) : null}

      {selectedType === "SMS" ? (
        <>
          <Input
            inputType="tel"
            label="Phone"
            placeholder="+12 345 678 901"
            value={formData.SMS.phone}
            onChange={(e) => updateField("SMS", "phone", e.target.value)}
          />
          <Input
            inputType="text"
            label="SMS content (optional)"
            placeholder="SMS content..."
            value={formData.SMS.message}
            onChange={(e) => updateField("SMS", "message", e.target.value)}
          />
        </>
      ) : null}

      {selectedType === "vCard" ? (
        <>
          <Input
            inputType="text"
            label="First and Last Name"
            placeholder="John Doe"
            value={formData.vCard.name}
            onChange={(e) => updateField("vCard", "name", e.target.value)}
          />
          <Input
            inputType="text"
            label="Organization (optional)"
            placeholder="ABC Company"
            value={formData.vCard.company}
            onChange={(e) => updateField("vCard", "company", e.target.value)}
          />
          <Input
            inputType="text"
            label="Title (optional)"
            placeholder="CEO"
            value={formData.vCard.title}
            onChange={(e) => updateField("vCard", "title", e.target.value)}
          />
          <Input
            inputType="tel"
            label="Phone number (optional)"
            placeholder="+12 345 678 901"
            value={formData.vCard.phone}
            onChange={(e) => updateField("vCard", "phone", e.target.value)}
          />
          <Input
            inputType="email"
            label="Email (optional)"
            placeholder="example@domain.com"
            value={formData.vCard.email}
            onChange={(e) => updateField("vCard", "email", e.target.value)}
          />
          <Input
            inputType="text"
            label="Address (optional)"
            placeholder="123 Main Street"
            value={formData.vCard.address}
            onChange={(e) => updateField("vCard", "address", e.target.value)}
          />
          <Input
            inputType="url"
            label="Website (optional)"
            placeholder="https://example.com"
            value={formData.vCard.website}
            onChange={(e) => updateField("vCard", "website", e.target.value)}
          />
          <Input
            as='textarea'
            label="Note (optional)"
            placeholder="Additional information..."
            value={formData.vCard.note}
            onChange={(e) => updateField("vCard", "note", e.target.value)}
          />
        </>
      ) : null}

      {selectedType === "Wi-Fi" ? (
        <>
          <Input
            inputType="text"
            label="Network Name (SSID)"
            placeholder="Network name..."
            value={formData["Wi-Fi"].ssid}
            onChange={(e) => updateField("Wi-Fi", "ssid", e.target.value)}
          />
          <Input
            inputType="text"
            label="Password"
            placeholder="Password..."
            value={formData["Wi-Fi"].password}
            onChange={(e) => updateField("Wi-Fi", "password", e.target.value)}
          />
          <Input
            as="select"
            label="Encryption"
            value={formData["Wi-Fi"].encryption}
            options={[
              { value: "WPA", label: "WPA/WPA2" },
              { value: "WEP", label: "WEP" },
              { value: "nopass", label: "No Password" },
            ]}
            onChange={(e) => updateField("Wi-Fi", "encryption", e.target.value)}
          />
          <Input
            inputType="checkbox"
            label="Hidden Network"
            checked={formData["Wi-Fi"].hidden}
            onChange={(e) => updateField("Wi-Fi", "hidden", e.target.checked)}
          />
        </>
      ) : null}

      <Input
        inputType="range"
        label="Code Margin"
        value={margin.toString()}
        onChange={(e) => setMargin(parseInt(e.target.value) || 0)}
        min={0}
        max={50} //exportSize / 2 - 10
        unit='px'
      />

      <Input
        inputType="range"
        label="Export Size"
        value={exportSize.toString()}
        onChange={(e) => {setExportSize(parseInt(e.target.value) || 300); props.setExportSize(parseInt(e.target.value) || 300)}}
        min={100}
        max={1000}
        unit='px'
      />

      <Input inputType="file" label="Middle Icon" onChange={() => undefined} />
    </div>
  );
}

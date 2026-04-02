import type { FormDataMap, QrType } from "./types";

const FALLBACK_QR_DATA: Record<QrType, string> = {
  URL: "https://github.com/fistaszek2009",
  Text: "Hello! Nice to see you here",
  Email: "mailto:example@domain.com?subject=Hello&body=Nice%20to%20see%20you",
  Phone: "tel:+12345678901",
  SMS: "SMSTO:+12345678901:Hello there",
  vCard: "BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nEND:VCARD",
  "Wi-Fi": "WIFI:T:WPA;S:MyNetwork;P:supersecret;;",
};

const escapeWifiValue = (value: string) => value.replace(/([\\;,:"])/g, "\\$1");

export function encodeQrData(type: QrType, data: FormDataMap[QrType]) {
  switch (type) {
    case "URL":
      return (data as FormDataMap["URL"]).url.trim();

    case "Text":
      return (data as FormDataMap["Text"]).text;
      
    case "Email": {
      const emailData = data as FormDataMap["Email"];

      if (!emailData.email.trim()) {
        return "";
      }

      const params = new URLSearchParams();

      if (emailData.subject.trim()) {
        params.set("subject", emailData.subject);
      }

      if (emailData.body.trim()) {
        params.set("body", emailData.body);
      }

      const query = params.toString();
      return `mailto:${emailData.email.trim()}${query ? `?${query}` : ""}`;
    }

    case "Phone": {
      const phoneData = data as FormDataMap["Phone"];
      return phoneData.phone.trim() ? `tel:${phoneData.phone.trim()}` : "";
    }

    case "SMS": {
      const smsData = data as FormDataMap["SMS"];
      return smsData.phone.trim()
        ? `SMSTO:${smsData.phone.trim()}:${smsData.message.trim()}`
        : "";
    }
    
    case "vCard": {
      const vcardData = data as FormDataMap["vCard"];

      if (!vcardData.name.trim()) {
        return "";
      }

      const names = vcardData.name.trim().split(' ')

      const lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${names.slice(0,names.length-1).join(' ')};${names[names.length-1] || ''};;;`,
        `FN:${names.join(' ')}`,
        vcardData.company.trim() ? `ORG:${vcardData.company.trim()}` : "",
        vcardData.title.trim() ? `TITLE:${vcardData.title.trim()}` : "",
        vcardData.phone.trim() ? `TEL:${vcardData.phone.trim()}` : "",
        vcardData.email.trim() ? `EMAIL:${vcardData.email.trim()}` : "",
        vcardData.address.trim() ? `ADR:${vcardData.address.trim()}` : "",
        vcardData.website.trim() ? `URL:${vcardData.website.trim()}` : "",
        vcardData.note.trim() ? `NOTE:${vcardData.note.trim()}` : "",
        "END:VCARD",
      ].filter(Boolean);

      return lines.join("\n");
    }
    case "Wi-Fi": {
      const wifiData = data as FormDataMap["Wi-Fi"];

      if (!wifiData.ssid.trim()) {
        return "";
      }

      return [
        "WIFI:",
        `T:${wifiData.encryption};`,
        `S:${escapeWifiValue(wifiData.ssid.trim())};`,
        wifiData.encryption !== "nopass" ? `P:${escapeWifiValue(wifiData.password)};` : "",
        wifiData.hidden ? "H:true;" : "", //H:false
        ";",
      ].join("");
    }
    default:
      return "";
  }
}

export function returnDefaultValues(type: QrType) {
  return FALLBACK_QR_DATA[type];
}

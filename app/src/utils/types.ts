import type { Options } from "qr-code-styling";

type UrlData    = { url: string };
type TextData   = { text: string };
type EmailData  = { email: string; subject: string; body: string };
type PhoneData  = { phone: string };
type SmsData    = { phone: string; message: string };
type VCardData  = { name: string; company: string; title: string; phone: string; email: string; address: string; website: string; note: string };
type WiFiData   = { ssid: string; password: string; encryption: string; hidden: boolean };

export type FormDataMap = {
  URL:   UrlData;
  Text:  TextData;
  Email: EmailData;
  Phone: PhoneData;
  SMS:   SmsData;
  vCard: VCardData;
  "Wi-Fi": WiFiData;
};

export type QrType = keyof FormDataMap;

export const DEFAULTS_DATA: FormDataMap = {
  URL:   { url: "" },
  Text:  { text: "" },
  Email: { email: "", subject: "", body: "" },
  Phone: { phone: "" },
  SMS:   { phone: "", message: "" },
  vCard: { name: "", company: "", title: "", phone: "", email: "", address: "", website: "", note: "" },
  "Wi-Fi": { ssid: "", password: "", encryption: "WPA", hidden: false },
};

export const DEFAULTS_STYLE: Options = {
    dotsOptions: {
            type: 'square',
            color: '#fad038',
            gradient: undefined,
            roundSize: false,
        },
        cornersSquareOptions: {
            type: 'square',
            color: '#fad038',
            gradient: undefined,
        },
        cornersDotOptions: {
            type: 'square',
            color: '#fad038',
            gradient: undefined,
        }
};

import QRCodeStyling from "qr-code-styling";

export function decodeQrData(type: number, codeData: string){
    switch (type){
        case 0:
        case 1:
            return codeData;
            //break;
        default:
            console.error('Wrong QR code data type')
            return ""
    }
}

export function encodeQrUrl(url: string, updateData: (data:string)=>void){
    //TODO: check if this is really URL (regex), hast to have http(s):// on the begining
    updateData(url)
}

export function encodeQrText(text: string, updateData: (data:string)=>void){
    //TODO: check if this is safe Text
    updateData(text)
}

export function returnDefaultValues(type: number){
     switch (type){
        case 0:
            return 'https://www.github.com/fistaszek2009'
        case 1:
            return 'Hello! Nice to see you here';
            //break;
        default:
            return "Hello world!"
    }
}
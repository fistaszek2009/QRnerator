import type { GradientType } from "qr-code-styling";
import type { QrColorStyles } from "../utils/types";
import type { Property } from 'csstype';

export function decodeQrColorToText(dotsType:'dotsOptions' | 'cornersSquareOptions' | 'cornersDotOptions' | 'backgroundOptions', colorType: number, code: QrColorStyles){
    switch (colorType){
        case 0:
            if(dotsType == 'backgroundOptions') return '#ffffff'

            if(dotsType == 'cornersSquareOptions'){
                if(code['dotsOptions'].gradient1 && code['dotsOptions'].gradient2) return decodeQrColorToText('dotsOptions', 2, code);
                else if(code['dotsOptions']?.color) return decodeQrColorToText('dotsOptions', 1, code);
            }
            if(dotsType == 'cornersDotOptions'){
                if(code['cornersSquareOptions'].gradient1 && code['cornersSquareOptions'].gradient2) return decodeQrColorToText('cornersSquareOptions', 2, code);
                else if(code['cornersSquareOptions']?.color) return decodeQrColorToText('cornersSquareOptions', 1, code);
            }
            if(dotsType == 'dotsOptions' && code['dotsOptions']?.color){
                if(code['dotsOptions'].gradient1 && code['dotsOptions'].gradient2) return decodeQrColorToText('dotsOptions', 2, code);
                else return decodeQrColorToText('cornersSquareOptions', 1, code);
            }

            return '#000000';
        
        case 1:
             if(!code[dotsType]?.color) return decodeQrColorToText(dotsType,0,code);
            return code[dotsType]?.color || ''

        case 2:
            if(!code[dotsType]?.gradient1 || !code[dotsType]?.gradient2 ) return decodeQrColorToText(dotsType,1,code);
            let text = '('
            text += code[dotsType]?.gradientType ? code[dotsType]?.gradientType + ' ' : '';
            text += code[dotsType]?.gradient1 + ' ';
            text += code[dotsType]?.gradient2 + ') ';
            text += code[dotsType]?.gradientRotation ? code[dotsType]?.gradientRotation + 'deg' : '';
            return text;

        default:
            return '';
    }
}

export function decodeQrColorToCSS(dotsType: 'dotsOptions' | 'cornersSquareOptions' | 'cornersDotOptions' | 'backgroundOptions', colorType: number, code: QrColorStyles) : Property.BackgroundColor {
    switch (colorType){
        case 0:
            if(dotsType == 'backgroundOptions') return '#ffffff'

            if(dotsType == 'cornersSquareOptions'){
                if(code['dotsOptions'].gradient1 && code['dotsOptions'].gradient2) return decodeQrColorToCSS('dotsOptions', 2, code);
                else if(code['dotsOptions']?.color) return decodeQrColorToCSS('dotsOptions', 1, code);
            }
            if(dotsType == 'cornersDotOptions'){
                if(code['cornersSquareOptions'].gradient1 && code['cornersSquareOptions'].gradient2) return decodeQrColorToCSS('cornersSquareOptions', 2, code);
                else if(code['cornersSquareOptions']?.color) return decodeQrColorToCSS('cornersSquareOptions', 1, code);
            }

            return '#000000';
        
        case 1:
             if(!code[dotsType]?.color) return decodeQrColorToCSS(dotsType,0,code);
            return code[dotsType]?.color || ''

        case 2:
            if(!code[dotsType]?.gradient1 || !code[dotsType]?.gradient2) return decodeQrColorToCSS(dotsType,1,code);

            let type = code[dotsType]!.gradientType || 'linear';
            let text = type + '-gradient('
            text += (type == 'radial' ? 'circle' : code[dotsType]!.gradientRotation ? code[dotsType]!.gradientRotation + 'deg' : '0deg') + ','

            text += code[dotsType]?.gradient1 + ' 0%, ';
            text += code[dotsType]?.gradient2 + ' 100%)';

            return text;

        default:
            return '';
    }
}


export function encodeQrColor(colorType: number, dotsType: 'dotsOptions' | 'cornersSquareOptions' | 'cornersDotOptions' | 'backgroundOptions', code: QrColorStyles){
    
}
import type { GradientType, Options } from "qr-code-styling";
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
            if (dotsType === 'backgroundOptions') return '#ffffff';

            if (dotsType === 'cornersDotOptions') {
                return decodeQrColorToCSS('cornersSquareOptions', 2, code);
            }

            if (dotsType === 'cornersSquareOptions') {
                return decodeQrColorToCSS('dotsOptions', 2, code);
            }

            if (code['dotsOptions']?.gradient1 && code['dotsOptions']?.gradient2)
                return decodeQrColorToCSS('dotsOptions', 2, code);
            if (code['dotsOptions']?.color)
                return decodeQrColorToCSS('dotsOptions', 1, code);

            return '#000000';
        
        case 1:
             if(!code[dotsType]?.color) return decodeQrColorToCSS(dotsType,0,code);
            return code[dotsType]?.color || ''

        case 2:
            if(!code[dotsType]?.gradient1 || !code[dotsType]?.gradient2) return decodeQrColorToCSS(dotsType,1,code);

            let type = code[dotsType]!.gradientType || 'linear';
            let text = type + '-gradient('
            text += (type == 'radial' ? 'circle' : code[dotsType]!.gradientRotation ? (code[dotsType]!.gradientRotation + 90) + 'deg' : '90deg') + ','

            text += code[dotsType]?.gradient1 + ' 0%, ';
            text += code[dotsType]?.gradient2 + ' 100%)';

            return text;

        default:
            return '';
    }
}


export function encodeQrColor(dotsType: 'dotsOptions' | 'cornersSquareOptions' | 'cornersDotOptions' | 'backgroundOptions', colorType: number, code: QrColorStyles): Options['dotsOptions']{
    const options: Options['dotsOptions'] = {
        color: code[dotsType]?.color,
        gradient: {
            type: (code[dotsType]?.gradientType || 'linear') as GradientType,
            rotation: code[dotsType]?.gradientRotation,
            colorStops: [
                {offset:0, color:code[dotsType]?.gradient1 || '#000'},
                {offset:1, color:code[dotsType]?.gradient2 || '#000'},
            ]
        }
    }

    switch (colorType){
        case 0:
            
            options.gradient = undefined;

            if(dotsType == 'backgroundOptions'){
                options.color = '#fff';
                return options
            }

            if(dotsType == 'cornersSquareOptions' || dotsType == 'cornersDotOptions'){
                options.color = undefined
                return options;
            }

            options.color = '#000000'
            return options;
        
        case 1:
            if(!code[dotsType]?.color) return encodeQrColor(dotsType,0,code);
            options.gradient = undefined;
            return options

        case 2:
            if(!code[dotsType]?.gradient1 || !code[dotsType]?.gradient2) return encodeQrColor(dotsType, 1, code);
            options.gradient!.rotation = (options.gradient?.rotation || 0)* (Math.PI/180)
            //options.color = undefined

            return options;
            
        default:
            return options;
    }
}
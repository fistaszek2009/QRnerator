import type { RefObject } from "react";
import { useEffect, useState } from "react";
import Input from "./Input";
import QRCodeStyling from "qr-code-styling";
import type { FormIconData } from "../utils/types";
import { DEFAULTS_ICON } from "../utils/types";
import { set } from "animejs";


export default function DataForm(props: {
  codeData: RefObject<QRCodeStyling | null>;
  visible: Boolean;
}){

    const [iconData, setIconData] = useState<FormIconData>(DEFAULTS_ICON);

  useEffect(() => {
    props.codeData.current?.update({
        image: iconData.iconData || undefined,
        imageOptions: {
            imageSize: iconData.imageSize,
            margin: iconData.margin,
            hideBackgroundDots: iconData.hideBackgroundDots
        }
    });
  }, [iconData, props.codeData]);


  return (
    <div className="form" style={{ display: props.visible ? "flex" : "none" }}>

      <Input inputtype="file" label="Middle Icon" 
        onChange={(e) => {
           const file = e.target.files && URL.createObjectURL(e.target.files[0]) || undefined
           setIconData({
            ...iconData,
            iconData: file
           });
          }} 
        />

        <Input
                inputtype="range"
                label="Icon Size"
                value={iconData.imageSize?.toString() || '0'}
                onChange={(e) => {
                    setIconData({
                        ...iconData,    
                        imageSize: parseFloat(e.target.value)
                    });
                }}
                min={0.1}
                max={1}
                step={0.1}
              />

        <Input
                inputtype="range"
                label="Icon Margin"
                value={iconData.margin?.toString() || '0'}
                onChange={(e) => {
                    setIconData({
                        ...iconData,
                        margin: parseFloat(e.target.value)
                    });
                }}
                min={0}
                max={50} 
                unit="px"
              />

        <Input
                    inputtype="checkbox"
                    label="Hide background dots"
                    checked={iconData.hideBackgroundDots}
                    onChange={(e) => {
                        setIconData({
                            ...iconData,
                            hideBackgroundDots: e.target.checked
                        })
                        }} 
        />


    </div>
  );
}

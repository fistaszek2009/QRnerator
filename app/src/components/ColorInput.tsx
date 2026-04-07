import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Options } from "qr-code-styling";

import RowSelect from "./RowSelect";
import Input from "./Input";

import {
  decodeQrColorToText,
  decodeQrColorToCSS,
  encodeQrColor,
} from "../utils/codeColor";
import { DEFAULTS_COLORS } from "../utils/types";
import type { QrColorStyles } from "../utils/types";

type Props = {
  label?: string;
  hint?: string;
  className?: string;
  field:
    | "dotsOptions"
    | "cornersSquareOptions"
    | "cornersDotOptions"
    | "backgroundOptions";
  initialValue?: string;
  placeholder?: string;
  options: Options;
  onChange: (field: string, value: unknown) => void;
};

type FieldProps = Props;

export default function ColorInput({
  label,
  hint,
  className = "",
  initialValue = "#000000",
  options,
  onChange,
  ...props
}: FieldProps) {
  const [opened, setOpened] = useState(false);
  const [type, setType] = useState(0);
  const [localStyles, setLocalStyles] = useState<QrColorStyles>({
    ...DEFAULTS_COLORS,
  });

  const updateField = <
    T extends keyof QrColorStyles,
    K extends keyof QrColorStyles[T],
  >(
    type: T,
    field: K,
    value: QrColorStyles[T][K],
  ) => {
    setLocalStyles((prev) => ({
      ...prev,
      [type]: { ...prev[type], [field]: value },
    }));
  };

  const fieldClassName = `form-input form-input-color-frame ${className ? ` ${className}` : ""}`;
  const [globalPreviewColor, setGlobalPreviewColor] = useState(initialValue);

  useEffect(() => {
    setGlobalPreviewColor(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const colorStyles = encodeQrColor(props.field, type, localStyles);
    onChange("color", colorStyles!.color);
    onChange("gradient", colorStyles!.gradient);
  }, [localStyles, type]);

  return (
    <div className={fieldClassName}>
      {label ? <label className="form-input-label">{label}</label> : null}
      <div
        className={`form-input-control ${opened ? "form-input-color-opened" : ""}`}
        onClick={!opened ? () => setOpened(true) : undefined}
      >
        <span
          className="form-input-color-preview"
          style={{
            background:
               type !== 0
                 ? decodeQrColorToCSS(props.field, type, localStyles)
                : globalPreviewColor || "transparent",
          }}
        ></span>
        {!opened ? (
          <p>
            {type === 0 ? "Global" : type === 1 ? "Color" : "Gradient"}{" "}
            {type > 0
              ? ": " + decodeQrColorToText(props.field, type, localStyles)
              : null}
          </p>
        ) : (
          <>
            <FontAwesomeIcon
              className="x"
              icon="xmark"
              size="lg"
              onClick={() => setOpened((prev) => !prev)}
            />
            <RowSelect
              options={["Global", "Single", "Gradient"]}
              selected={type}
              onSelectedChange={setType}
            />
            {type === 1 ? (
              <div className="input-section">
                <Input
                  label="Color"
                  placeholder="#ffffff"
                  value={localStyles[props.field]?.color}
                  onChange={(e) =>
                    updateField(props.field, "color", e.target.value)
                  }
                />
              </div>
            ) : type === 2 ? (
              <>
                <div className="input-section">
                  <Input
                    label="Color 1"
                    placeholder="#ffffff"
                    value={localStyles[props.field]?.gradient1 || ""}
                    onChange={(e) =>
                      updateField(props.field, "gradient1", e.target.value)
                    }
                  />
                  <Input
                    label="Color 2"
                    placeholder="#000000"
                    value={localStyles[props.field]?.gradient2 || ""}
                    onChange={(e) =>
                      updateField(props.field, "gradient2", e.target.value)
                    }
                  />
                </div>
                <div className="input-section">
                  <Input
                    label="Gradient type"
                    as="select"
                    value={localStyles[props.field]?.gradientType || "linear"}
                    options={[
                      { value: "linear", label: "Linear" },
                      { value: "radial", label: "Radial" },
                    ]}
                    onChange={(e) =>
                      updateField(props.field, "gradientType", e.target.value)
                    }
                  />
                  <Input
                    label="Rotation"
                    inputtype="range"
                    value={
                      localStyles[props.field]?.gradientRotation?.toString() ||
                      "0"
                    }
                    unit="deg"
                    placeholder={props.placeholder}
                    onChange={(e) =>
                      updateField(
                        props.field,
                        "gradientRotation",
                        parseInt(e.target.value),
                      )
                    }
                    min={-180}
                    max={180}
                  />
                </div>
              </>
            ) : null}
          </>
        )}
      </div>
      {hint ? <p className="form-input-hint">{hint}</p> : null}
    </div>
  );
}

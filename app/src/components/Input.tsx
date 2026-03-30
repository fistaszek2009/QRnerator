import type { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

type BaseProps = {
  label?: string;
  hint?: string;
  className?: string;
};

type InputFieldProps = BaseProps & {
  as?: "input";
  inputType?: InputHTMLAttributes<HTMLInputElement>["type"];
  value?: string;
  placeholder?: string;
  checked?: boolean;
  options?: never;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

type TextareaFieldProps = BaseProps & {
  as: "textarea";
  value?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

type SelectOption = {
  label: ReactNode;
  value: string;
};

type SelectFieldProps = BaseProps & {
  as: "select";
  value?: string;
  options: SelectOption[];
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
};

type FieldProps = InputFieldProps | TextareaFieldProps | SelectFieldProps;

export default function Input({
  as = "input",
  label,
  hint,
  className = "",
  ...props
}: FieldProps) {
  
  const isCheckbox = as === "input" && "inputType" in props && props.inputType === "checkbox";

  const fieldClassName = `form-input${isCheckbox ? " is-checkbox" : ""}${className ? ` ${className}` : ""}`;

  const renderField = () => {
    if (as === "textarea") {
      const textareaProps = props as TextareaFieldProps;

      return (
        <textarea
          className="form-input-control form-input-textarea"
          placeholder={textareaProps.placeholder}
          value={textareaProps.value}
          onChange={textareaProps.onChange}
        />
      );
    }

    if (as === "select") {
      const selectProps = props as SelectFieldProps;

      return (
        <select
          className="form-input-control form-input-select"
          value={selectProps.value}
          onChange={selectProps.onChange}
        >
          {selectProps.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    const inputProps = props as InputFieldProps;

    return (
      <input
        className={`form-input-control${isCheckbox ? " form-input-checkbox" : ""}`}
        type={inputProps.inputType}
        placeholder={inputProps.placeholder}
        value={isCheckbox ? undefined : inputProps.value}
        checked={isCheckbox ? inputProps.checked : undefined}
        onChange={inputProps.onChange}
      />
    );
  };

  if (isCheckbox) {
    return (
      <div className={fieldClassName}>
        <label className="form-input-checkbox-row">
          {renderField()}
          <span>{label}</span>
        </label>
        {hint ? <p className="form-input-hint">{hint}</p> : null}
      </div>
    );
  }

  return (
    <div className={fieldClassName}>
      {label ? <label className="form-input-label">{label}</label> : null}
      {renderField()}
      {hint ? <p className="form-input-hint">{hint}</p> : null}
    </div>
  );
}

import { useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { FormValues } from "./ControlledInput";

interface CheckboxProps {
  options: string[];
  control: UseControllerProps["control"];
  name: string;
}

const Checkboxes = ({ options, control, name }: CheckboxProps) => {
  const { field } = useController({
    control,
    name,
  });
  const [value, setValue] = useState(field.value || []);

  return (
    <>
      <div className="flex space-x-2">
        {options.map((option, index) => (
          <input
            onChange={(e) => {
              const valueCopy = [...value];
              valueCopy[index] = e.target.checked ? e.target.value : null;
              field.onChange(valueCopy);
              setValue(valueCopy);
            }}
            key={option}
            checked={value.includes(option)}
            type="checkbox"
            value={option}
          />
        ))}
      </div>
    </>
  );
};

export { Checkboxes };
export type { CheckboxProps };

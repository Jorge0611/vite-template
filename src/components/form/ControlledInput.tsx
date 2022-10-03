import { useController, UseControllerProps } from "react-hook-form";

type InputProps = {
  id?: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea";
  children?: JSX.Element;
};

type FormValues = {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

function ControlledInput(props: UseControllerProps & InputProps) {
  const { field } = useController(props);

  return (
    <div id={props.name} className="flex flex-col">
      <label className="label" htmlFor={`input-${props.name}`}>
        {props.label}
      </label>
      {props.children || (
        <input
          id={`input-${props.name}`}
          className="input w-full"
          type="text"
          {...field}
        />
      )}
    </div>
  );
}

export { ControlledInput };
export type { FormValues, InputProps };

import { FC } from "react";

interface _FormGroupProps {
  label: string;
  id: string;
  type?: "text" | "email" | "tel" | "textarea";
  children?: JSX.Element;
}

const FormGroup = ({
  id,
  label,
  children,
}: _FormGroupProps): ReturnType<FC> => {
  return (
    <div className="flex flex-col">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      {children || (
        <input className="input w-full" type="text" name={id} id={id} />
      )}
    </div>
  );
};

export default function Contact(): ReturnType<FC> {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const elements = e.currentTarget.elements;
    const mapped = Array.prototype.map.call(elements, (ele) => {
      if (ele.name) {
        return {
          [ele.name]: ele.value,
        };
      }
    });

    console.log(mapped);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <header>
        <h1 className="font-bold">Contact</h1>
        <p>Send us a message</p>
      </header>
      <main className="mt-8 flex flex-col items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
          <FormGroup id="name" label="Name" />
          <FormGroup label="Email" id="email" />
          <FormGroup label="Phone" id="phone" />
          <FormGroup label="Message" id="message">
            <textarea
              className="input w-full"
              name="message"
              id="message"
              cols={30}
              rows={2}
            />
          </FormGroup>
          <button
            type="submit"
            className="w-full bg-blue-600 py-2 px-4 font-semibold text-white hover:bg-blue-800 hover:transition-transform active:-translate-y-[2px]"
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
}

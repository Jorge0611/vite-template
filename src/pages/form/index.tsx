import { Checkboxes } from "@/components/form/ControlledCheckbox";
import { ControlledInput } from "@/components/form/ControlledInput";
import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { parseActions, parseRule } from "@/utils/rules";
import type { Rules } from "@/utils/rules";

const rules: Rules[] = [
  {
    conditions: [
      {
        field: "firstName",
        operator: "in",
        value: "admin",
      },
      {
        field: "email",
        operator: "eq",
        value: "admin",
      },
    ],
    actions: [
      {
        type: "hide",
        field: "email",
      },
      {
        type: "hide",
        field: "phone",
      },
    ],
    counter: [
      {
        type: "show",
        field: "email",
      },
      {
        type: "show",
        field: "phone",
      },
    ],
  },
  {
    conditions: [
      {
        field: "option",
        operator: "in",
        value: "a",
      },
      {
        field: "option",
        operator: "nin",
        value: "b",
      },
    ],
    actions: [
      {
        type: "required",
        field: "email",
      },
      {
        type: "hide",
        field: "phone",
      },
    ],
  },
];

export default function Form(): ReturnType<FC> {
  const { handleSubmit, control, watch } = useForm();

  const onSubmit = (data: Object) => {
    alert(JSON.stringify(data));
  };

  useEffect(() => {
    const subscription = watch((value) => {
      rules.forEach((rule) => {
        parseActions(parseRule(rule, value));
      });

      console.log(value);
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <header>
        <h1 className="font-bold">Formulary</h1>
      </header>
      <main className="mt-8 flex flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-2"
        >
          <Checkboxes name="option" options={["a", "b"]} control={control} />

          <ControlledInput
            label="First Name"
            name="firstName"
            control={control}
          />

          <ControlledInput
            label="Last Name"
            name="lastName"
            control={control}
          />

          <ControlledInput
            id="email"
            label="Email"
            name="email"
            control={control}
          />

          <ControlledInput
            id="phone"
            label="Phone"
            name="phone"
            control={control}
          />

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

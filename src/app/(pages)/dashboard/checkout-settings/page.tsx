import React from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { AdvancedCheckbox, CheckboxGroup, Text } from 'rizzui';

const options = [
  {
    value: 'single',
    title: 'Single Payment',
    description: 'Charge a one-time fee',
  },
  {
    value: 'double',
    title: 'Single Payment',
    description: 'Charge a one-time fee',
  }
]

export default function App() {
  const [values, setValues] = React.useState<string[]>(["single"]);

  return (
    <CheckboxGroup
      values={values}
      setValues={setValues}
      className="grid grid-cols-1 sm:grid-cols-3 max-w-2xl mx-auto gap-4"
    >
      {options.map((item) => (
        <AdvancedCheckbox
          key={item.value}
          name="payment"
          value={item.value}
          inputClassName="[&:checked~span_.icon]:block"
        >
          <span className="flex justify-between">
            <Text as="b">{item.title}</Text>
            <CheckCircleIcon className="icon hidden h-5 w-5 text-secondary" />
          </span>
          <Text>{item.description}</Text>
        </AdvancedCheckbox>
      ))}
    </CheckboxGroup>
  );
}
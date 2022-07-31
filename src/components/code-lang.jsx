import { forwardRef } from "react";
import { Group, Text, Select } from "@mantine/core";
const data = [
  {
    image: "/assets/svg/python.svg",
    label: "Python (3.10.5)",
    value: "py",
  },
];

const SelectItem = forwardRef(({ image, label, ...others }, ref) => (
  <div ref={ref} {...others}>
    <Group noWrap>
      <img src={image} height="25px" width="25px" alt="logo" />
      <Text size="sm">{label}</Text>
    </Group>
  </div>
));
export default function CodeLang() {
  return <Select itemComponent={SelectItem} data={data} defaultValue={"py"} />;
}

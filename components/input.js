import { FormLabel, Input } from "@chakra-ui/react";

export default function Inputs({
  name,
  onchange,
  type = "text",
  placeholder,
  val,
}) {
  return (
    <>
      <FormLabel mb={3} mt={3}>
        {name}
      </FormLabel>
      <Input
        type={type}
        width="600px"
        name={name}
        borderWidth={2}
        borderRadius={15}
        placeholder={placeholder}
        onChange={onchange}
        value={val}
        id={name}
        required
      />
    </>
  );
}

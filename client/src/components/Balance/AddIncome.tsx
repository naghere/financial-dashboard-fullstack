import { TextInput, NumberInput, Button, Group, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";

function AddIncome() {
  const form = useForm({
    initialValues: {
      name: "",
      amount: "",
      tag: "",
    },

    validate: {},
  });

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form
        onSubmit={form.onSubmit((values) => {
          axios.post("http://localhost:5000/api/v1/income", values);
          console.log(values);
        })}
      >
        <TextInput
          required
          label="Name"
          placeholder="Add a name for this income"
          {...form.getInputProps("name")}
        />
        <NumberInput
          defaultValue={0}
          placeholder="Amount"
          label="Add income amount"
          required
          {...form.getInputProps("amount")}
        />
        <TextInput
          defaultValue={"Uncategorized"}
          label="Tag"
          placeholder="Add a category for this income"
          {...form.getInputProps("tag")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
export default AddIncome;
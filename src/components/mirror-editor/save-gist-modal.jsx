import React, { useState } from "react";
import { Modal, Button, TextInput, Textarea, Group, Checkbox } from "@mantine/core";
import { useForm } from "@mantine/form";

// local
import { saveGist } from "../../backend-utils/code-utils/saveGist";
import { displayNotification } from "../../utils/displayNotification";

export default function SaveGistModal({ codeRef, isOpened, setIsOpened }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    initialValues: {
      gistName: "",
      gistDescription: "",
      saveAsPrivate: false,
    },
    validate: {
      gistName: (value) => (value.length < 3 ? "Gist name must have at least 3 letters" : null),
    },
    validateInputOnChange: true,
  });

  const handleSubmit = (values) => {
    setIsSubmitting(true);
    saveGist({ ...values, language: "py", document: codeRef.current })
      .then(() => {
        displayNotification({
          mssg: (
            <p style={{ margin: 0 }}>
              <b>Success!</b> Code saved as Gist.
            </p>
          ),
          color: "green",
        });
      })
      .catch((_) => {
        displayNotification({
          mssg: (
            <p style={{ margin: 0 }}>
              <b>Error!</b> Something went wrong.
            </p>
          ),
          color: "red",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
        setIsOpened(false);
      });
  };

  return (
    <Modal opened={isOpened} onClose={() => setIsOpened(false)} title="Save to Github Gists" overlayOpacity={0.55} overlayBlur={3}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput placeholder="Gist name" label="Gist name" data-autofocus {...form.getInputProps("gistName")} />
        <br />
        <Textarea placeholder="Gist description" label="Gist description" {...form.getInputProps("gistDescription")} />
        <Checkbox mt="md" label="Save as private Gist" {...form.getInputProps("saveAsPrivate", { type: "checkbox" })} />

        <Group position="right" mt="md">
          <Button loading={isSubmitting} type="submit">
            Save Code
          </Button>
        </Group>
      </form>
    </Modal>
  );
}

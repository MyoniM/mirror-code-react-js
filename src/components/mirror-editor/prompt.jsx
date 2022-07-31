import { useState, useEffect, useRef } from "react";
import { Textarea, Button } from "@mantine/core";
import { FaSyncAlt } from "react-icons/fa";
// style
import classes from "./prompt.module.css";
// local
import { displayNotification } from "../../utils/displayNotification";

export default function Prompt({ socketRef, room, editorRef }) {
  const [value, setValue] = useState("");
  const [syncedValue, setSyncedValue] = useState("");

  const handleSync = () => {
    setSyncedValue(value);
    socketRef.current.emit("sync_prompt", { room, prompt: value });
  };

  useEffect(() => {
    if (!socketRef.current) return;
    socketRef.current.on("prompt_sync", (prompt) => {
      // incase 3rd person joins, set editorRef to the new val
      editorRef.current = prompt;
      // change syncedValue b/c we want sync to be disable if not edited
      setSyncedValue(prompt);
      setValue(prompt);
      if (prompt !== "") {
        displayNotification({
          mssg: <p style={{ margin: 0 }}>Prompt updated just now.</p>,
          color: "lime",
        });
      }
    });

    return () => {
      socketRef.current.off("prompt_sync");
    };
  }, [socketRef.current]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h3>Prompt</h3>
        <div className={classes.roomBtn}>
          <Button disabled={syncedValue == value} variant="filled" leftIcon={<FaSyncAlt />} color={"green"} onClick={handleSync}>
            Sync
          </Button>
        </div>
      </div>
      <Textarea
        value={value}
        style={{ height: "64vh", overflow: "auto" }}
        onChange={(e) => {
          editorRef.current = e.target.value;
          setValue(e.target.value);
        }}
        minRows={26}
        placeholder="Write question prompt here."
        variant="filled"
      />
    </div>
  );
}

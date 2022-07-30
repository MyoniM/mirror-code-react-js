import { useState } from "react";
import RichTextEditor from "@mantine/rte";

// style
import classes from "./prompt.module.css";

export default function Prompt() {
  console.log("======================");

  const initialValue = "<h4>Write whatever you want here.</h4>";

  const [value, onChange] = useState(initialValue);
  return (
    <div className={classes.wrapper}>
      <RichTextEditor value={value} onChange={onChange} style={{ height: "70vh", overflow: "auto" }} />
    </div>
  );
}

import React from "react";

// style
import classes from "./output.module.css";

export interface IProps {
  output: { data: string; stderr: boolean };
}

export default function Output({ output }: IProps) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h3>Output</h3>
      </div>
      <div className={classes.body}>
        <textarea
          className={classes.output}
          value={output.data}
          style={output.stderr ? { color: "red" } : {}}
          readOnly
        />
      </div>
    </div>
  );
}

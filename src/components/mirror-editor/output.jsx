import React from "react";
import { Skeleton } from "@mantine/core";

// style
import classes from "./output.module.css";

export default function Output({ result, codeExecuting }) {
  const { output, executionTime, submittedAt } = result;
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h3>Output</h3>
        <Skeleton visible={codeExecuting} height="50px" width="fit-content">
          <div className={classes.info}>
            <p>
              <b>Last submit time: </b>
              {submittedAt}
            </p>
            <p className={classes.status}>
              <b>Execution time: </b>
              {executionTime}ms
            </p>
          </div>
        </Skeleton>
      </div>
      <div className={classes.body}>
        <Skeleton visible={codeExecuting} height="12vh" style={{ marginTop: "5px" }}>
          <textarea className={classes.output} value={output.data} style={output.stderr ? { color: "red" } : {}} readOnly />
        </Skeleton>
      </div>
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { Button } from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/python/python";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

// style
import classes from "./editor.module.css";

// components
import Output from "./output";

//local
import { displayNotification } from "../../utils/displayNotification";

export default function Editor({ socketRef, room, codeRef }) {
  console.log("============ERRRR==========");
  const [result, setResult] = useState({
    submittedAt: "Not submitted",
    executionTime: "0",
    output: { data: "Click 'Run Code' to see program output.", stderr: false },
  });
  const [codeExecuting, setCodeExecuting] = useState(false);

  const { ref, toggle, fullscreen } = useFullscreen();
  const editorRef = useRef(null);

  useEffect(() => {
    editorRef.current = Codemirror.fromTextArea(document.getElementById("realtimeEditor"), {
      mode: { name: "python" },
      theme: "dracula",
      autoCloseTags: true,
      autoCloseBrackets: true,
      lineNumbers: true,
    });

    editorRef.current.on("change", (instance, changes) => {
      const code = instance.getValue();
      codeRef.current = code;
      const { origin } = changes;
      if (origin !== "setValue") {
        socketRef.current.emit("code_change", { room, code });
      }
    });
  }, []);

  useEffect(() => {
    if (!socketRef.current) return;
    socketRef.current.on("code_change", (code) => {
      if (code !== null) {
        editorRef.current.setValue(code);
        editorRef.current.focus()
        editorRef.current.setCursor({ line: 3, ch: 10 });
      }
    });

    socketRef.current.on("code_executing", () => {
      setCodeExecuting(true);
    });

    socketRef.current.on("run_result", ({ executionTime, output, submittedAt }) => {
      setResult({ output, executionTime, submittedAt });
      setCodeExecuting(false);
    });

    return () => {
      socketRef.current.off("code_change");
      socketRef.current.off("run_result");
      socketRef.current.off("code_executing");
    };
  }, [socketRef.current]);

  const handleRunCode = async () => {
    try {
      setCodeExecuting(true);
      if (codeRef.current.trim().length === 0) throw new Error("No data provided");
      const payload = {
        language: "py",
        code: codeRef.current,
      };
      // emit execute_code
      socketRef.current.emit("execute_code", { room, payload });
    } catch (_) {
      displayNotification({
        mssg: (
          <p style={{ margin: 0 }}>
            <b>Error!</b> Check your input.
          </p>
        ),
        color: "red",
      });
      setCodeExecuting(false);
    }
  };

  return (
    <div ref={ref} className={classes.wrapper}>
      <div>
        <div className={classes.header}>
          <h3>Your Code</h3>
          <div className={classes.action}>
            <Button className={classes.toggleBtn} onClick={toggle}>
              {fullscreen ? <BsFullscreenExit className={classes.icon} /> : <BsFullscreen className={classes.icon} />}
            </Button>
            <Button
              variant="filled"
              onClick={handleRunCode}
              // loading={codeExecuting}
            >
              Run Code
            </Button>
          </div>
        </div>

        <textarea id="realtimeEditor"></textarea>
      </div>
      <div className={classes.output} style={fullscreen ? { height: "30vh" } : { height: "21vh" }}>
        <Output result={result} codeExecuting={codeExecuting} />
      </div>
    </div>
  );
}

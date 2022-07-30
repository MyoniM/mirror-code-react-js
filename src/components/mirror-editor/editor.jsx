import React, { useEffect, useRef, useState } from "react";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { Button } from "@mantine/core";
import { useFullscreen } from "@mantine/hooks";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

// style
import classes from "./editor.module.css";

// components
import Output from "./output";

//local
import { runCode } from "../../backend-utils/code-utils/run-code";
import { displayNotification } from "../../utils/displayNotification";

export default function Editor({ socketRef, room, handleCodeChange }) {
  console.log("============ERRRR==========");
  const [output, setOutput] = useState({ data: "Click 'Run Code' to see program output.", stderr: false });
  const { ref, toggle, fullscreen } = useFullscreen();
  const editorRef = useRef(null);

  useEffect(() => {
    editorRef.current = Codemirror.fromTextArea(document.getElementById("realtimeEditor"), {
      mode: { name: "javascript", json: true },
      theme: "dracula",
      autoCloseTags: true,
      autoCloseBrackets: true,
      lineNumbers: true,
    });

    editorRef.current.on("change", (instance, changes) => {
      const code = instance.getValue();
      handleCodeChange(code);
      const { origin } = changes;
      if (origin !== "setValue") {
        socketRef.current.emit("code_change", { room, code });
      }
    });
  }, []);

  useEffect(() => {
    if (!socketRef.current) return;
    socketRef.current.on("code_change", (code) => {
      if (code !== null) editorRef.current.setValue(code);
    });

    return () => {
      socketRef.current.off("code_change");
    };
  }, [socketRef.current]);

  // const handleRunCode = async () => {
  //   try {
  //     if (codeRef.current.trim().length === 0) throw new Error("Error");
  //     const payload: IPayload = {
  //       language: "py",
  //       document: codeRef.current,
  //     };
  //     const { data } = await runCode(payload);
  //     setOutput(data.output);
  //   } catch (_) {
  //     displayNotification({
  //       mssg: (
  //         <p style={{ margin: 0 }}>
  //           <b>Error!</b> Something went wrong.
  //         </p>
  //       ),
  //       color: "red",
  //     });
  //   }
  // };

  return (
    <div ref={ref} className={classes.wrapper}>
      <div>
        <div className={classes.header}>
          <h3>Your Code</h3>
          <div className={classes.action}>
            <Button className={classes.toggleBtn} onClick={toggle}>
              {fullscreen ? <BsFullscreenExit className={classes.icon} /> : <BsFullscreen className={classes.icon} />}
            </Button>
            {/* <Button variant="filled" onClick={handleRunCode}>
              Run Code
            </Button> */}
          </div>
        </div>

        <textarea id="realtimeEditor"></textarea>
      </div>
      <div className={classes.output} style={fullscreen ? { height: "30vh" } : { height: "21vh" }}>
        <Output output={output} />
      </div>
    </div>
  );
}

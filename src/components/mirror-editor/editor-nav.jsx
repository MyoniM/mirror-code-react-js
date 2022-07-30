import React, { useState } from "react";
import { BsGithub } from "react-icons/bs";
import { Button } from "@mantine/core";

// styles
import classes from "./editor-nav.module.css";
// components
import Logo from "../logo";
// import Timer from "../timer/timer";
import Profile from "../profile";
import CodeLang from "../code-lang";
import SaveGistModal from "./save-gist-modal";

export default function EditorNav() {
  const [isOpened, setIsOpened] = useState(false);
  const handleSaveCode = async () => setIsOpened(true);

  return (
    <div className={classes.wrapper}>
      <Logo src={"/assets/logo.png"} />
      <div className={classes.space} />
      <CodeLang />
      {/* <Timer /> */}

      <div className={classes.rightMenu}>
        <Button
          leftIcon={
            <BsGithub
              style={{
                fontSize: "20px",
              }}
            />
          }
          variant="white"
          onClick={handleSaveCode}
        >
          Save Code
        </Button>
        <SaveGistModal isOpened={isOpened} setIsOpened={setIsOpened} />
        <Profile />
      </div>
    </div>
  );
}

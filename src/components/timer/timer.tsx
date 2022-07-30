import React from "react";
import { MdTimer } from "react-icons/md";
import { Menu, Button } from "@mantine/core";

// styles
import classes from "./timer.module.css";

export default function Timer() {
  return (
    <Menu
      control={
        <Button
          variant="subtle"
          leftIcon={<MdTimer className={classes.icon} />}
        >
          Set Timer
        </Button>
      }
    >
      <Menu.Label>Set Timer</Menu.Label>
      <div></div>
    </Menu>
  );
}

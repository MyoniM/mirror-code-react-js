import React from "react";
import { Avatar } from "@mantine/core";

// style
import classes from "./room-avatar.module.css";

export default function RoomAvatar({ user, color }) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.avatarWrapper}>
        <Avatar className={classes.avatar} color={color} radius="sm">
          {user.username.substring(0, 1).toUpperCase()}
        </Avatar>
      </div>
      <h5>{user.username}</h5>
    </div>
  );
}

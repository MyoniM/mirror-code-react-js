import React from "react";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

// style
import classes from "./room.module.css";
// components
import RoomAvatar from "../room/room-avatar";

// local
import { colors } from "../../constants/colors";
import { displayNotification } from "../../utils/displayNotification";

export default function Room({ roomUsers, room }) {
  const navigate = useNavigate();

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(room);
      displayNotification({
        mssg: (
          <p style={{ margin: 0 }}>
            <b>Success!</b> Room id copied to clipboard.
          </p>
        ),
        color: "lime",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const leaveRoom = () => {
    navigate("/");
    displayNotification({
      mssg: <p style={{ margin: 0 }}>You left the room.</p>,
      // color: "lime",
    });
  };
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h3>Room Status</h3>

        <div className={classes.roomBtn}>
          <Button variant="light" onClick={copyRoomId}>
            Copy room link
          </Button>
          <Button color="red" onClick={leaveRoom}>
            Leave room
          </Button>
        </div>
      </div>
      <div className={classes.body}>
        {roomUsers.map((user, i) => (
          <RoomAvatar key={i} user={user} color={colors[i % roomUsers.length]} />
        ))}
      </div>
    </div>
  );
}

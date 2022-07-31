import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
// style
import classes from "../styles/mirror-editor.module.css";

// components
import Editor from "../components/mirror-editor/editor";
import Prompt from "../components/mirror-editor/prompt";
import Room from "../components/mirror-editor/room";
import EditorNav from "../components/mirror-editor/editor-nav";
import CenterLoading from "../components/center-loading";
// local
import { useAuth } from "../hooks/useAuth";
import initSocket from "../configs/socket";
import { displayNotification } from "../utils/displayNotification";

export default function MirrorEditor() {
  const socketRef = useRef();
  const codeRef = useRef("");
  const editorRef = useRef("");

  const navigate = useNavigate();
  const location = useLocation();
  const { r, u } = queryString.parse(location.search);
  const [roomUsers, setRoomUsers] = useState([]);
  const { authUser, loading } = useAuth();

  const handleError = () => {
    displayNotification({
      mssg: (
        <p style={{ margin: 0 }}>
          <b>Error!</b> Something went wrong.
        </p>
      ),
      color: "red",
    });
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (!loading && !authUser) navigate("/", { replace: true });
  }, [authUser, loading]);

  // this effect wont run without a user
  useEffect(() => {
    if (!authUser) return;
    socketRef.current = initSocket();
    socketRef.current.on("connect_error", (_) => handleError());
    socketRef.current.on("connect_failed", (_) => handleError());
    // Emitters
    socketRef.current.emit("join_room", { username: u, room: r });
    // Listeners
    // (DEV) CATCH-ALL EVENTS
    // socketRef.current.onAny((event, ...args) => console.log(event, args));
    socketRef.current.on("message", (message) => {
      displayNotification({ mssg: <p style={{ margin: 0 }}>{message.text}</p>, color: "blue" });
    });
    // get users inside the room
    socketRef.current.on("room_users", ({ joinedUser, users }) => {
      setRoomUsers(users);
      if (u !== joinedUser) socketRef.current?.emit("sync_code", { room: r, code: codeRef.current });
      if (u !== joinedUser) socketRef.current?.emit("sync_prompt", { room: r, prompt: editorRef.current });
    });

    return () => {
      socketRef.current?.off("connect_error");
      socketRef.current?.off("connect_failed");
      socketRef.current?.off("room_users");
      socketRef.current?.off("message");
      socketRef.current?.disconnect();
    };
  }, [loading]);

  if (loading || !authUser) return <CenterLoading height="100vh" width="100vw" />;
  return (
    <div className={classes.container}>
      <EditorNav codeRef={codeRef} />
      <div className={classes.wrapper}>
        <div className={classes.prompt}>
          <Prompt socketRef={socketRef} room={r} editorRef={editorRef} />
          <Room roomUsers={roomUsers} room={r} />
        </div>
        <div className={classes.editor}>
          <Editor socketRef={socketRef} room={r} codeRef={codeRef} />
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Button, TextInput } from "@mantine/core";
import { BsGithub } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// style
import classes from "../styles/index.module.css";
// local
import { oAuth } from "../services/githubAuthPopupSignIn";
import { useAuth } from "../hooks/useAuth";
// components
import Logo from "../components/logo";
import CenterLoading from "../components/center-loading";
import Profile from "../components/profile";
// local
import { createRoomInfo } from "../utils/createRoomInfo";
import { displayNotification } from "../utils/displayNotification";

const Home = () => {
  const { authUser, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (actionNumber) => {
    setIsLoading(true);
    // authenticate before creating a room
    try {
      if (!authUser) {
        const token = await oAuth();
        localStorage.setItem("O2", token);
        setIsLoading(false);
      } else {
        // actionNumber === 0 ? create : join
        if (actionNumber === 0) {
          const { success, username, room } = await createRoomInfo();
          if (success) return navigate(`/mirror-editor/?r=${room}&u=${username}`);
          throw new Error("Error");
        } else {
          if (value === "") throw new Error("Error");
          const { success, username } = await createRoomInfo();
          if (success) return navigate(`/mirror-editor/?r=${value}&u=${username}`);
          throw new Error("Error");
        }
      }
      setIsLoading(false);
    } catch (_) {
      setIsLoading(false);
      displayNotification({
        mssg: (
          <p style={{ margin: 0 }}>
            <b>Error!</b> Something went wrong.
          </p>
        ),
        color: "red",
      });
    }
  };

  if (loading) return <CenterLoading height="100vh" width="100vw" />;
  return (
    <div>
      <nav className={classes.nav}>
        <Logo src="/assets/dark-logo.png" />
        {authUser ? (
          <Profile />
        ) : (
          <Button
            leftIcon={
              <BsGithub
                style={{
                  fontSize: "20px",
                }}
              />
            }
            variant="subtle"
            loading={isLoading}
            onClick={() => handleSubmit()}
          >
            Get Started
          </Button>
        )}
      </nav>
      <div className={classes.wrapper}>
        <div className={classes.hero}>
          <div className={classes.heroContent}>
            <h1>Code and learn together</h1>
            <p>The collaborative, in-browser IDE</p>
            <div className={classes.actions}>
              <TextInput placeholder="Room id" value={value} onChange={(e) => setValue(e.target.value)} size="lg" required />
              <Button
                className={classes.btn}
                leftIcon={
                  <FiLogIn
                    style={{
                      fontSize: "20px",
                    }}
                  />
                }
                variant="outline"
                size="lg"
                loading={isLoading}
                onClick={() => handleSubmit(1)}
              >
                Join Room
              </Button>
            </div>
            <p className={classes.create}>
              Or <span onClick={() => handleSubmit(0)}>create</span> your own room.
            </p>
          </div>
        </div>
        {/* <div className={classes.features}></div> */}
      </div>
    </div>
  );
};

export default Home;

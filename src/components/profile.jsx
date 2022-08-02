import React from "react";
import { Menu, Button } from "@mantine/core";
import { FiLogOut } from "react-icons/fi";

// local
import { useAuth } from "../hooks/useAuth";

const style = {
  height: "35px",
  width: "35px",
  borderRadius: "50%",
  cursor: "pointer",
};
export default function Profile() {
  const { authUser, signOut } = useAuth();
  return (
    <Menu shadow="md" width={200} styles={{ zIndex: 100 }}>
      <Menu.Target>
        <Button style={{ backgroundColor: "transparent", padding: 0 }}>
          <img src={authUser?.photoURL || ""} style={style} alt="profile img" />
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Danger zone</Menu.Label>
        <Menu.Item color="red" icon={<FiLogOut size={14} />} onClick={() => signOut()}>
          Log Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

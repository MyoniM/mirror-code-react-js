import React from "react";
import { Menu } from "@mantine/core";
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
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <img src={authUser?.photoURL || ""} style={style} alt="profile img"/>
      </Menu.Target>

      <Menu.Dropdown>
        {/* <Menu.Item icon={<FiSettings size={14} />} onClick={() => navigate("/settings/editor-settings")}>
          Settings
        </Menu.Item>
        <Menu.Item icon={<HiOutlineCode size={14} />} onClick={() => navigate("/settings/profile")}>
          Gists
        </Menu.Item> */}
        {/* <Divider /> */}

        <Menu.Label>Danger zone</Menu.Label>

        <Menu.Item color="red" icon={<FiLogOut size={14} />} onClick={() => signOut()}>
          Log Out
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

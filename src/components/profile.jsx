import React from "react";
import { Menu, Divider } from "@mantine/core";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { HiOutlineCode } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

// local
import { useAuth } from "../hooks/useAuth";

const style = {
  height: "35px",
  width: "35px",
  borderRadius: "50%",
  cursor: "pointer",
};
export default function Profile() {
  const navigate = useNavigate();

  const { authUser, signOut } = useAuth();
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <img src={authUser?.photoURL || ""} style={style} />
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

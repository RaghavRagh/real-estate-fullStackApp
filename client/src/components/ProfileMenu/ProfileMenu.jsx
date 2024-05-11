import { Avatar, Menu } from "@mantine/core";
// import { MenuDropdown } from "@mantine/core/lib/Menu/MenuDropdown/MenuDropdown";
// import { MenuItem } from "@mantine/core/lib/Menu/MenuItem/MenuItem";

const ProfileMenu = ({ user, logout }) => {
  return (
    <Menu>
      <Menu.Target>
        <Avatar src={user?.picture} alt="user image" radius={"xl"} />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item> Favourite </Menu.Item>
        <Menu.Item> Bookings </Menu.Item>
        <Menu.Item
          onClick={() => {
            localStorage.clear();
            logout();
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;

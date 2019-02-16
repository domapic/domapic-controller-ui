import { Component } from "react";

import { Component as MenuSections } from "src/components/menu-sections";
import { Component as MenuAbout } from "src/components/menu-about";

import { HomeMenu } from "./views/HomeMenu";
import { SettingsMenu } from "./views/SettingsMenu";
import { UserMenu } from "./views/UserMenu";

export class Menu extends Component {
  static Home = HomeMenu;
  static Settings = SettingsMenu;
  static User = UserMenu;
  static Sections = MenuSections;
  static About = MenuAbout;
}

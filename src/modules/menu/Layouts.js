import { Component } from "react";

import { Component as MenuSections } from "./components/sections";
import { Component as MenuAbout } from "./components/about";

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

import { plugins } from "reactive-data-source";

import { userMe } from "src/data-layer/users";

import { UpdateUser } from "./UpdateUser";
import { Component as Account } from "../components/account";

export const mapDataSourceToProps = () => ({
  user: userMe.read.getters.value,
  userLoading: userMe.read.getters.loading,
  userError: userMe.read.getters.error,
  UpdateUser
});

export const UpdateUserMe = plugins.connect(mapDataSourceToProps)(Account);

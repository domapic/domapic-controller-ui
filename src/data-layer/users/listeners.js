import { userModels } from "./user/origins";
import { usersCollection } from "./users/origins";
import { userMe } from "./me/origins";

userModels.onChangeAny(changeDetails => {
  if (
    [userModels.actions.delete.success, userModels.actions.update.success].includes(
      changeDetails.action
    )
  ) {
    usersCollection.clean();
    userMe.clean();
  }
});

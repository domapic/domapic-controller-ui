import { userMe, userMeWithAvatar, userMeIsAdmin } from "./me";
import { usersCollection, usersCollectionFilteredAndSorted } from "./collection";
import { usersModels, usersModelsWithExtraData, userAllowedRoles } from "./model";

usersModels.onChangeAny(changeDetails => {
  if (
    [usersModels.actions.delete.success, usersModels.actions.update.success].includes(
      changeDetails.action
    )
  ) {
    usersCollection.clean();
    userMe.clean();
  }
});

export { usersModels, usersModelsWithExtraData, userAllowedRoles };
export { usersCollection, usersCollectionFilteredAndSorted };
export { userMe, userMeWithAvatar, userMeIsAdmin };

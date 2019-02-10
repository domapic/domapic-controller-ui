import { userMe, userMeWithAvatar, userMeIsAdmin } from "./me";
import {
  usersCollection,
  usersCollectionExactFiltered,
  usersCollectionFilteredAndSorted
} from "./collection";
import {
  usersModels,
  usersModelsWithExtraData,
  userAllowedRoles,
  isValidUserName,
  isValidUserEmail
} from "./model";

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

export { userMe, userMeWithAvatar, userMeIsAdmin };
export { usersCollection, usersCollectionExactFiltered, usersCollectionFilteredAndSorted };
export {
  usersModels,
  usersModelsWithExtraData,
  userAllowedRoles,
  isValidUserName,
  isValidUserEmail
};

import { userMe, userMeWithExtraData, userMeIsAdmin } from "./me";
import {
  usersCollection,
  usersCollectionExactFiltered,
  usersCollectionFilteredAndSorted
} from "./collection";
import { usersModels, usersModelsWithExtraData, userAllowedRoles } from "./model";

import {
  isValidUserName,
  isValidUserEmail,
  isUserNameRepeated,
  isUserEmailRepeated
} from "./validations";

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

export {
  userMe,
  userMeWithExtraData,
  userMeIsAdmin,
  usersCollection,
  usersCollectionExactFiltered,
  usersCollectionFilteredAndSorted,
  usersModels,
  usersModelsWithExtraData,
  userAllowedRoles,
  isValidUserName,
  isValidUserEmail,
  isUserNameRepeated,
  isUserEmailRepeated
};

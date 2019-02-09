export const isSystemRole = (user, rolesResults) => {
  return rolesResults.find(role => {
    return role.name === user.role;
  }).isSystem;
};

export const avatarValueFromResponse = response =>
  response.status === 200 ? response.request.responseURL : null;

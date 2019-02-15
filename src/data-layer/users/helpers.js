export const isSystemRole = (user, rolesResults) => {
  return rolesResults.find(role => {
    return role.name === user.role;
  }).isSystem;
};

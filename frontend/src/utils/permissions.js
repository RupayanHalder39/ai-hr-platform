export function hasPermissions(userPermissions = [], required = []) {
  if (!required.length) return true;
  return required.every((permission) => userPermissions.includes(permission));
}

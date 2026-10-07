export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

export function isAdminRole(role) {
  return role === ROLES.ADMIN;
}

/**
 * Combines guestRole (salutation) and guestName without duplicating
 * if the name already starts with the role.
 * 
 * @param {string} guestRole - The salutation/role (e.g. "Anh", "Chị")
 * @param {string} guestName - The guest name (e.g. "Tuấn", "Anh Tuấn")
 * @returns {string} - Combined salutation and name
 */
export const getFullGuestName = (guestRole, guestName) => {
  if (!guestName) return "Quý Khách";
  if (!guestRole) return guestName.trim();
  
  const role = guestRole.trim();
  const name = guestName.trim();
  
  if (!name) return role;
  
  const nameLower = name.toLowerCase();
  const roleLower = role.toLowerCase();
  
  // Check if name already starts with the role to prevent double salutations (e.g. "Anh Anh Tuấn")
  if (nameLower.startsWith(roleLower)) {
    const afterPrefix = nameLower.slice(roleLower.length);
    if (afterPrefix.startsWith(" ") || afterPrefix.length === 0) {
      return name;
    }
  }
  
  return `${role} ${name}`;
};

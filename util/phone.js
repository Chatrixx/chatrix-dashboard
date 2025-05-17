// convert 05417606509 to 5417606509
export const convertPhone = (phone) => {
  if (phone.startsWith("0")) {
    phone = phone.substring(1);
  }
  return phone;
};

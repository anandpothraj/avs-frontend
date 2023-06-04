export const clearUserData = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
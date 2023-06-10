import { isJson } from "./isJson";

export const redirectUser = () => {
  // fetching user from localstorage
  let user = localStorage.getItem("user");
  if (user && isJson(user)) {
    user = JSON.parse(user);
    let accountType = user.accountType.toLowerCase();
    return accountType;
  } 
  else {
    return null;
  }
};
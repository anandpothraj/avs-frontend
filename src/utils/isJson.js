// This function takes an json and return true if the json is valid and false if json is invalid
export const isJson = (json) => {
  try {
    JSON.parse(json);
  } 
  catch (e) {
    return false;
  }
  return true;
};
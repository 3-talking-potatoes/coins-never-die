/* eslint-disable no-useless-escape */
/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
const handleNumberFormat = (value: string) => {
  let string = value?.split(".");
  string[0] = string[0]
    .replace(/[^-\.0-9]/g, "")
    .replace(/(.)(?=(\d{3})+$)/g, "$1,");

  const fmStr = string.join(".");
  let result = fmStr.replace(
    /[`~!@#$%^&*()_|+\-=?;:'"<>\{\}\[\]\\\|ㄱ-ㅎ|ㅏ-ㅣ-ㅢ|가-힣|a-z|A-Z]/g,
    "",
  );

  if (result.length >= 2 && result[0] === "0" && result[1] !== ".") {
    result = result.substring(1);
  }
  return result;
};

export default handleNumberFormat;

const handleNumberFormat = (value: string) => {
  let str = value.split(".");
  str[0] = str[0].replace(/[^-\.0-9]/g, "").replace(/(.)(?=(\d{3})+$)/g, "$1,");

  let fmStr = str.join(".");
  let result = fmStr.replace(
    /[`~!@#$%^&*()_|+\-=?;:'"<>\{\}\[\]\\\|ㄱ-ㅎ|ㅏ-ㅣ-ㅢ|가-힣|a-z|A-Z]/g,
    "",
  );

  return result;
};

export default handleNumberFormat;

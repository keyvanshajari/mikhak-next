export const replaceToFarsiNumber = (input: string) => {
  const english = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const farsi = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  for (let i = 0; i < english.length; i++) {
    input = input.replaceAll(english[i], farsi[i]);
  }
  return input;
};

export const replaceToEnglishNumber = (input: string) => {
  const english = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const farsi = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  for (let i = 0; i < farsi.length; i++) {
    input = input.replaceAll(farsi[i], english[i]);
  }
  return input;
};

export const normilizeUpperText = (input: string): string => {
  input = input.replace("_", " ");
  return input[0].toLocaleUpperCase() + input.substring(1).toLocaleLowerCase();
};

export const nameToCodeText = (input: string): string => {
  input = input.replace(" ", "_");
  return input.toLocaleLowerCase();
};

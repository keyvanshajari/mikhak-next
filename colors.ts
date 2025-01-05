export default {
  primary: {
    DEFAULT: "#5242A2",
    1: getColorTheme("#E0D9F5", "#1A103D"),
    2: getColorTheme("#C1B3EB", "#2E1A6A"),
    3: getColorTheme("#A28DE1", "#432497"),
    4: getColorTheme("#8367D7", "#582EC4"),
    5: getColorTheme("#6441CD", "#6441CD"),
    6: getColorTheme("#5242A2", "#5242A2"),
    7: getColorTheme("#582EC4", "#8367D7"),
    8: getColorTheme("#432497", "#A28DE1"),
    9: getColorTheme("#2E1A6A", "#C1B3EB"),
    10: getColorTheme("#1A103D", "#E0D9F5"),
  },
  secondary: {
    DEFAULT: "#02A9BF",
    1: getColorTheme("#D1F4F9", "#012E34"),
    2: getColorTheme("#A3E9F3", "#025C69"),
    3: getColorTheme("#75DEED", "#038A9E"),
    4: getColorTheme("#47D3E7", "#05B8D3"),
    5: getColorTheme("#19C8E1", "#19C8E1"),
    6: getColorTheme("#02A9BF", "#02A9BF"),
    7: getColorTheme("#05B8D3", "#47D3E7"),
    8: getColorTheme("#038A9E", "#75DEED"),
    9: getColorTheme("#025C69", "#A3E9F3"),
    10: getColorTheme("#012E34", "#D1F4F9"),
  },
  neutral: {
    1: getColorTheme("#FFFFFF", "#000000"),
    2: getColorTheme("#F5F7F9", "#191C1E"),
    3: getColorTheme("#EBEDEF", "#2F3132"),
    4: getColorTheme("#DFE1E3", "#444749"),
    5: getColorTheme("#C5C7C9", "#5C5F61"),
    6: getColorTheme("#A9ABAD", "#757779"),
    7: getColorTheme("#757779", "#A9ABAD"),
    8: getColorTheme("#5C5F61", "#C5C7C9"),
    9: getColorTheme("#444749", "#DFE1E3"),
    10: getColorTheme("#2F3132", "#EBEDEF"),
    11: getColorTheme("#191C1E", "#F5F7F9"),
    12: getColorTheme("#000000", "#FFFFFF"),
  },
  success: getColorTheme("#00AB50", "#00AB50"),
  warning: getColorTheme("#FFC043", "#FFC043"),
  error: getColorTheme("#F23218", "#F23218"),
  info: getColorTheme("#216fD9", "#216FD9"),
  background: getColorTheme("#ffffff", "#1C2028"),
  onBackground: getColorTheme("#191C1E", "#DCE0E8"),
  surface: getColorTheme("#F5F6F8", "#040810"),
  onSurface: getColorTheme("#191C1E", "#DCE0E8"),
};

interface IColor {
  [key: string]: string;
}

function getColorTheme(light: string, dark: string): IColor {
  return { light, dark };
}

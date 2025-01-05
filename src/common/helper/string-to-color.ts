export class ColorHelper {
  static stringToColor(s: string | undefined | null): string {
    switch (ColorHelper._getLastCharUnicode(s)) {
      case 0:
        return "#00BD9D";
      case 1:
        return "#438ED3";
      case 2:
        return "#9133CC";
      case 3:
        return "#4BBB45";
      case 4:
        return "#DB5776";
      case 5:
        return "#F78639";
      case 6:
        return "#E53439";
      case 7:
        return "#C23CDD";
      case 8:
        return "#29AED6";
      case 9:
        return "#A2BA36";
      default:
        return "#00BD9D";
    }
  }

  static _getLastCharUnicode(input: string | undefined | null): number {
    if (input == null || input == undefined || input.trim() == "") {
      const rentino = "rentino";
      return rentino.charCodeAt(rentino.length - 1) % 10;
    }
    return input.charCodeAt(input.length - 1) % 10;
  }
}

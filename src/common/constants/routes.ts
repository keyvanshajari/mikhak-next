class Routes {
  static rootPage = "/";

  //Auth Routes
  static loginPage = `${this.rootPage}login`;
  static registerPage = `${this.rootPage}register`;
  static verficaionPage = `${this.rootPage}verfication`;
  static profile = `${this.rootPage}profile`;
  static newContact = `${this.rootPage}new-contact`;

  //Static Routes
  static termsPage = `${this.rootPage}terms`;
}

export default Routes;

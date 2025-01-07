class Routes {
  static rootPage = "/";

  //Auth Routes
  static loginPage = `${this.rootPage}login`;
  static registerPage = `${this.rootPage}register`;
  static verficaionPage = `${this.rootPage}verfication`;
  static profile = `${this.rootPage}profile`;
  static newContact = `${this.rootPage}new-contact`;

  //Static Routes
  static staticPage = `${this.rootPage}static/`;
  static termsPage = `${this.staticPage}terms`;
}

export default Routes;

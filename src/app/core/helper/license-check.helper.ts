export class LicenseCheckHelper {
  private license: string;

  constructor(license: string) {
    this.license = license.toUpperCase();
  }

  public formatShortLicense(): string {

    if (this.isPattern1(this.license)) {
      return `${this.license.slice(0, 2)}-${this.license.slice(2, 4)}-${this.license.slice(4)}`;
    }
    else if (this.isPattern2(this.license)) {
      return `${this.license.slice(0, 2)}-${this.license.slice(2, 4)}-${this.license.slice(4)}`;
    }
    else if (this.isPattern3(this.license)) {
      return `${this.license.slice(0, 2)}-${this.license.slice(2, 4)}-${this.license.slice(4)}`;
    }

    return this.license;
  }

  private isPattern1(license: string): boolean {
    // XX00XX to XX-00-XX
    return /^[A-Z]{2}\d{2}[A-Z]{2}$/.test(license);
  }

  private isPattern2(license: string): boolean {
    // 00XXXX to 00-XX-XX
    return /^\d{2}[A-Z]{4}$/.test(license);
  }

  private isPattern3(license: string): boolean {
    // XXXX00 to XX-XX-00
    return /^[A-Z]{4}\d{2}$/.test(license);
  }
}

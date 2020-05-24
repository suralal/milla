import { Injectable } from '@angular/core';
import * as phoneLib from 'google-libphonenumber';

@Injectable()
export class PhoneService {
  private phoneUtil = phoneLib.PhoneNumberUtil.getInstance();

  isValid(phoneNumber: string, countryCode: string): boolean {
    try {
      const phoneNumberProto = this.phoneUtil.parse(phoneNumber, countryCode);
      return this.phoneUtil.isValidNumberForRegion(
        phoneNumberProto,
        countryCode
      );
    } catch (e) {
      return false;
    }
  }

  fromPhone(fullPhone: string): any {
    const phoneNumberProto = this.phoneUtil.parse(fullPhone, '');
    const country = {
      callingCodes: [phoneNumberProto.getCountryCode()],
      phone: phoneNumberProto.getNationalNumber()
    };
    return country;
  }
}

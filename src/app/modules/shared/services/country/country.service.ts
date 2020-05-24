import { Injectable } from '@angular/core';

import { Countries } from './countries';
import { countriesCallingCodes } from './country-calling-code';

@Injectable()
export class CountryService {
  private countries: Array<any>;

  public getAllCountries(): Array<any> {
    if (this.countries) {
      return this.countries;
    }
    this.countries = Countries
      // for testing replace with .filter(value => value.callingCodes[0] === '66' || value.callingCodes[0] === '47')
      .filter(value => value.callingCodes[0])
      .sort((a, b) => a.name.localeCompare(b.name));
    return this.countries;
  }
  public getCountryNameAndCallingCode() {
    return countriesCallingCodes;
  }
}

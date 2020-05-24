import { Injectable } from '@angular/core';

import { Languages } from './languages';

@Injectable()
export class LanguageService {

    private languages: Array<any>;

    public getAllLanguages(): Array<any> {
        if (this.languages) {
            return this.languages;
        }
        this.languages = Languages.sort((a, b) => a.name.localeCompare(b.name));
        return this.languages;
    }

}

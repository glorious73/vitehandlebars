import { arabic } from "../i18n/ar";
import { english } from "../i18n/en";

class Localize {
    constructor() { 
        this.selectedLang = localStorage.getItem("lang") || "ar"; // 'ar' or 'en'
        this.ar           = arabic;
        this.en           = english;
    }

    static getInstance() {
        if (!this.instance)
            this.instance = new Localize();
        return this.instance;
    }

    setLang(lang) {
        if(this.selectedLang == lang)
            return;
        this.selectedLang = lang;
        localStorage.setItem("lang", lang);
    }

    getLang() {
        return this.selectedLang;
    }

    l(key, variables) {
        const translation = this[this.selectedLang][key] || key;
        const options     = (variables) ? variables : false;
        if(key.endsWith("-plural"))
            return this.interpolate(this.pluralFormFor(translation, options.count), options);
        return options ? this.interpolate(translation, options) : translation;
    }

    interpolate(message, interpolations) {
        return Object.keys(interpolations).reduce((interpolated, key) => interpolated.replace(new RegExp(`{\s*${key}\s*}`, "g"), interpolations[key]), message);
    }

    pluralFormFor(forms, count) {
        const matchingForm = new Intl.PluralRules(this.selectedLang).select(count);
        return forms[matchingForm];
    }
}

export const localize = Localize.getInstance();
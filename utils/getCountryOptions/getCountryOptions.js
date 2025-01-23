import countries from "world-countries";

export const getCountryOptions = () => {
    return countries.map((country) => ({
        value: country.cca2.toLowerCase(), // Two-letter country code
        label: `${country.flag} ${country.name.common}`, // Flag and country name
        code: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ""), // Dialing code
    }));
};
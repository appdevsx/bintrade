import countries from "world-countries";

export const getCurrencyOptions = () => {
    return countries.map((country) => ({
        value: country.currencies
        ? Object.keys(country.currencies)[0] // Extract the currency code
        : "N/A", // Handle cases where currency information is unavailable
        label: `${country.flag} ${country.name.common} (${
        country.currencies
            ? Object.keys(country.currencies)[0]
            : "No Currency"
        })`, // Include flag, country name, and currency code
        code: country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : ""),
    }));
};
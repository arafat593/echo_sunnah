const { allCountries } = require('country-telephone-data');
console.log("Total countries:", allCountries.length);
console.log("Sample country:", allCountries.find(c => c.iso2 === 'bd'));

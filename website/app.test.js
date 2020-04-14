const {countries} = require('./app');

test('should return list of countries', () => {
    const countriesTest = countries;
    expect(typeof(countriesTest) === 'object');
});



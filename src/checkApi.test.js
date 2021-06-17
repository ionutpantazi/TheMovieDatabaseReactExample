const {asyncCall}  = require('./checkApi');
test('check if api returns response', () => {
  return asyncCall().then(data => {
    expect(data.results.length).toBeGreaterThan(0);
  });
});
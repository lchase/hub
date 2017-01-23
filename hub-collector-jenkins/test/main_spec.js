import { executeMain } from '../src/main';

describe('jenkins test run', () => {
  it('simple way to debug the collector', () => {
    console.log("logged");
    executeMain();
  });

});
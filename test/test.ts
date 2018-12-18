import { expect, tap } from '@pushrocks/tapbundle';
import * as webdetector from '../ts/index'

let testWebDetector: webdetector.WebDetector;

tap.test('should create a valid instance of webdetector', async () => {
  testWebDetector = new webdetector.WebDetector();
  expect(testWebDetector).to.be.instanceOf(webdetector.WebDetector);
})

tap.test('should determine if we are currently online', async () => {
  let onlineResultBoolean = await testWebDetector.isOnline();
  expect(onlineResultBoolean).to.be.true;
});

tap.start()

import * as webdetector from '../ts/index'

console.log('hi');

const run = async () => {
  const testWebDetector = new webdetector.WebDetector({
    checkOnlineUrl: 'https://pubapi.lossless.one'
  });
  const onlineResultBoolean = await testWebDetector.isOnline();
  console.log('browser is online:')
  console.log(onlineResultBoolean);
  testWebDetector.startPeriodicChecks();
  testWebDetector.onlineObservable.subscribe((state) => {
    console.log(state);
  })
}
run();

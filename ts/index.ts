import * as plugins from './webdetector.plugins';

export class WebDetector {
  
  /**
   * 
   */
  async isOnline() {
    const navigatorOnline = window.navigator.onLine
    let reachesGoogle: boolean = false;
    if (navigatorOnline) {
      const controller = new AbortController();
      const fetchPromise = fetch('https://google.com', { signal: controller.signal });
      const timeout = setTimeout(() => {
        controller.abort();
      }, 5000);

      await fetchPromise.then(async response => {
        reachesGoogle = true
      });
    }
    return reachesGoogle;
  }
}
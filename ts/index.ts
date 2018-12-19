import * as plugins from './webdetector.plugins';

import {throttleTime } from 'rxjs/operators';

export interface IWebDetectorOptions {
  checkOnlineUrl: string;
}

export class WebDetector {
  options: IWebDetectorOptions;
  private onlineObservableIntake = new plugins.smartrx.ObservableIntake();
  onlineObservable = this.onlineObservableIntake.observable.pipe(throttleTime(10000));
  latestState: 'online' | 'offline' = 'online';

  constructor(optionsArg: IWebDetectorOptions) {
    this.options = optionsArg;
  }

  /**
   * 
   */
  async isOnline() {
    let reachesInternet: boolean = false;
    const controller = new AbortController();
    const fetchPromise = fetch(this.options.checkOnlineUrl, { signal: controller.signal });
    const timeout = setTimeout(() => {
      controller.abort();
    }, 1000);

    await fetchPromise.then(async response => {
        reachesInternet = true
    }).catch(err => {
      // console.log(`request to ${this.options.checkOnlineUrl} failed}`)
    });
    const latestLocalState = (() => {
      if(reachesInternet) {
        return 'online'
      } else {
        return 'offline'
      }
    })();
    if(latestLocalState !== this.latestState) {
      
      this.onlineObservableIntake.push(this.latestState);
    }
    this.latestState = latestLocalState;
    return reachesInternet;
  }

  async startPeriodicChecks() {
    while (true) {
      await this.isOnline();
      await plugins.smartdelay.delayFor(3000);
    }
  }
}
import Dexie from 'dexie';

export class DexieService extends Dexie {
  constructor() {
    super('WeatherDB');
    this.version(3).stores({
      weathers: '++id',
    });
  }
}
import { Injectable } from '@angular/core';
import Dexie from 'dexie';

import { DexieService } from './dexie.service';
import { Weather } from 'src/models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  table: Dexie.Table<Weather, number>;

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('weathers');
  }

  getAll() {
    return this.table.toArray();
  }

  add(data) {
    return this.table.add(data);
  }

  update(id, data: Weather) {
    return this.table.update(id, data);
  }

  deleteTable() {
    this.dexieService.table('weathers').clear()
  }
}

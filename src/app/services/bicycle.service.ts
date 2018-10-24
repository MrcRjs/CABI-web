import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Bicycle } from '../models/bicycle.model';

@Injectable({
  providedIn: 'root'
})
export class BicycleService {

  constructor(private db: AngularFireDatabase) {}

  getBicycle(uid): AngularFireObject<Bicycle> {
    const path = `/bicicletas/${uid}`;
    return this.db.object<Bicycle>(path);
  }

  getBicycles() {
    const path = '/bicicletas';
    return this.db.list(path);
  }

  create(bike: Bicycle) {
    const path = `/bicicletas/${bike.uid}/${bike.id}`;
    return this.db.object(path).set(bike);
  }

  udate(bike: Bicycle) {
    const path = `/bicicletas/${bike.uid}/${bike.id}`;
    return this.db.object(path).update(bike);
  }

  remove(bike: Bicycle) {
    const path = `/bicicletas/${bike.uid}/${bike.id}`;
    return this.db.object(path).remove();
  }
}

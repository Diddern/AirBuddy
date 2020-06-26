import { Injectable } from '@angular/core';
import * as Airtable from 'airtable';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AirtableService {
  private readonly base: Airtable.Base;
  resulater: Airtable.Records<any>;

  constructor() {
    this.base = new Airtable({apiKey: environment.AIRTABLE_API_KEY}).base(environment.AIRTABLE_BASE);
    this.resulater = [];
  }

  getAnsatte(): Promise<ReadonlyArray<Airtable.Record<{}>> | void> {
    return this.base('Ansatt').select({view: 'Oversikt'})
      .all()
      .then(records => {
        return records;
        /*
        Det er mulig å gjøre ting med hver record inni her.
         records.forEach(record => {
            console.log('Retrieved', (record as any).get('Team'));
        });
         */
      }).catch(err => console.log('Noe gikk galt i kontakt med Airtable. Feilelding: ', err));
  }

  getTeams(): Promise<ReadonlyArray<Airtable.Record<{}>> | void> {
    return this.base('Team').select({view: 'Teamoversikt'})
      .all()
      .then(records => {
        return records;
      }).catch(err => console.log('Noe gikk galt i kontakt med Airtable. Feilelding: ', err));
  }
}

export default AirtableService;

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
  teams: Airtable.Records<any>;
  navn: Airtable.Records<any>;

  constructor() {
    this.base = new Airtable({apiKey: environment.AIRTABLE_API_KEY}).base(environment.AIRTABLE_BASE);
    this.resulater = [];
    this.teams = [];
  }

  getBase(): Airtable.Base {
    return this.base;
  }

  getNavn(): Promise<ReadonlyArray<Airtable.Record<{}>> | void> {
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
      }).catch(err => console.log('Noe gikk galt i kontakt med Airtable da vi prøvde å finne tabellfeilmelding: ', err));
  }

  getTeams(): object {
    return this.teams;
  }

  getDataFromAirtable(base: Airtable.Base, tableName: string, view: string, navn: string = 'Team'): any {
    base(tableName).select({
      view
    }).all()
      .then(records => {
        this.resulater = records;
        console.log('records', records);
        // debugger;
        // if (navn === 'Navn') { this.navn = records.map(a => (a as any).fields.get('Navn')); }
        // if (navn === 'Team') { this.teams = records.map(a => (a as any).fields.get('Team')); }
        return records;
        /*
        Det er mulig å gjøre ting med hver record inni her.
         records.forEach(record => {
            console.log('Retrieved', (record as any).get('Team'));
        });
         */
      }).catch(err => console.log('Noe gikk galt i kontakt med Airtable da vi prøvde å finne tabell', tableName, 'i view:', view, 'feilmelding: ', err));
  }
}

export default AirtableService;

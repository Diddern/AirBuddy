import { Component, OnInit } from '@angular/core';
import { AirtableService } from '../services/airtable.service';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(public airtableService: AirtableService) {}

  kolonnerSomSkalVises: string[] = ['Navn', 'Senioritet', 'Kundeticker'];
  lasterDataFraAirtable = true;
  resultaterLengde = 0;
  data = [];

  pageEvent: PageEvent;
  pageSize = 50;
  pageIndex = 0;
  lowValue = 0;
  highValue = 50;

  ngOnInit(): void {
    this.airtableService.getNavn().then(records => {
      this.data = (records as Airtable.Records<any>).map(a => a.fields);
      this.resultaterLengde = this.data.length;
      this.lasterDataFraAirtable = false;
    });
  }

  /*
  * Paginerer sidene på klientsiden, slik at selv om vi henter all data fra
  * Airtable samtidig (Airtable gjør paginering for oss, og slår sammen igjen),
  * så ønsker vi å vise data i en litt mindre liste til brukerne.
  */
  getPaginatorData(event): any{
    if (event.pageIndex === this.pageIndex + 1){
      this.lowValue = this.lowValue + this.pageSize;
      this.highValue =  this.highValue + this.pageSize;
    }
    else if (event.pageIndex === this.pageIndex - 1){
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue =  this.highValue - this.pageSize;
    }
    this.pageIndex = event.pageIndex;
  }
}

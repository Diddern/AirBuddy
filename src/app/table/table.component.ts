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

  ansattData = [];
  ansattKolonnerSomSkalVises: string[] = ['Navn', 'Senioritet', 'Kundeticker'];
  lasterAnsattDataFraAirtable = true;
  ansatteResultaterLengde = 0;

  // Akkurat nå vises bare teams i konsollet.
  teamsData = [];
  teamsKolonnerSomSkalVises: string[] = [''];
  lasterTeamsDataFraAirtable = true;
  teamsResultaterLengde = 0;

  // Variabler for pagination
  pageEvent: PageEvent;
  pageSize = 50;
  pageIndex = 0;
  lowValue = 0;
  highValue = 50;

  ngOnInit(): void {
    this.airtableService.getAnsatte().then(records => {
      this.ansattData = (records as Airtable.Records<any>).map(a => a.fields);
      this.ansatteResultaterLengde = this.ansattData.length;
      this.lasterAnsattDataFraAirtable = false;
    });
    this.airtableService.getTeams().then(records => {
      this.teamsData = (records as Airtable.Records<any>).map(a => a.fields);
      this.teamsResultaterLengde = this.teamsData.length;
      this.lasterTeamsDataFraAirtable = false;
      console.log('Teams data:', this.teamsData);
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

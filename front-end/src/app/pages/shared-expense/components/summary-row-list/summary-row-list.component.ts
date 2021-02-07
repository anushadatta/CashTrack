import { Component, OnInit } from '@angular/core';
import { SummaryCardsComponent } from '../summary-cards/summary-cards.component';

@Component({
  selector: 'app-summary-row-list',
  templateUrl: './summary-row-list.component.html',
  styleUrls: ['./summary-row-list.component.scss']
})
export class SummaryRowListComponent implements OnInit {

  summary_row = [  
    {label: 'TOTAL BALANCE', amount: '1.50' , content: '$(YOU ARE OWED) - $(YOU OWE)', type:'1'},
    {label: 'YOU OWE', amount: '21.30', content: '^ HIGHEST you owe $17.2 to Daniel Leong', type:'2'},
    {label: 'YOU ARE OWED', amount: '25.50' , content: '^ HIGHEST you owed $21.2 by Mehul Kumar', type:'3'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

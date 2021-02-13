import { Component, OnInit } from '@angular/core';
import { SummaryCardsComponent } from '../summary-cards/summary-cards.component';

@Component({
  selector: 'app-summary-row-list',
  templateUrl: './summary-row-list.component.html',
  styleUrls: ['./summary-row-list.component.scss']
})
export class SummaryRowListComponent implements OnInit {

  summary_row = [  
    {label: 'TOTAL BALANCE', amount: '4.20', content: '$ (YOU ARE OWED) - $ (YOU OWE)', color:'black', icon:'icon-line.png'},
    {label: 'YOU OWE', amount: '21.30', content: '▽ HIGHEST you owe $17.2 to Daniel Leong', color:'#EC4C47', icon:'icon-minus.png'},
    {label: 'YOU ARE OWED', amount: '25.50' , content: '△  HIGHEST you owed $21.2 by Mehul Kumar', color:'#47B881', icon:'icon-plus.png'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

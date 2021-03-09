import { Component, Input, OnInit, NgZone, OnChanges, SimpleChanges } from '@angular/core';
import { SummaryCardsComponent } from '../summary-cards/summary-cards.component';

@Component({
  selector: 'app-summary-row-list',
  templateUrl: './summary-row-list.component.html',
  styleUrls: ['./summary-row-list.component.scss']
})
export class SummaryRowListComponent implements OnChanges {

  @Input() you_are_owed;
  @Input() you_owe;

  owed;
  owe;

  summary_row = [  
    {label: 'TOTAL BALANCE', amount: 4.20, content: '$ (YOU ARE OWED) - $ (YOU OWE)', color:'black', icon:'icon-line.png'},
    {label: 'YOU OWE', amount: 21.30, content: '▽ HIGHEST you owe $17.2 to Daniel Leong', color:'#EC4C47', icon:'icon-minus.png'},
    {label: 'YOU ARE OWED', amount: 25.50 , content: '△  HIGHEST you owed $21.2 by Mehul Kumar', color:'#47B881', icon:'icon-plus.png'},
  ];

  constructor(public ngZone:NgZone) { 
  }

  public ngOnChanges(changes: SimpleChanges) {
    if ('you_are_owed' in changes) {
      this.summary_row[2].amount = this.you_are_owed;
      this.summary_row[0].amount = Number((this.you_are_owed - this.you_owe).toFixed(2));
      console.log('changing...');
    }
}       


  ngOnInit(): void {
    this.owed = this.you_are_owed;
    this.owe = this.you_owe;
    this.summary_row[0].amount = Number((this.owed - this.owe).toFixed(2));
    this.summary_row[1].amount = this.owe;
    this.summary_row[2].amount = this.you_are_owed;
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Column, EditEventArgs, GridComponent, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { setCurrencyCode, loadCldr } from '@syncfusion/ej2-base';
import { Query, DataManager } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public data: object[] = [
    {ExpenseID:'1',Date:'04/09/2022',Amount:200,'Type':'electricity','Description':'For Month of September'},
    {ExpenseID:'2',Date:'04/08/2022',Amount:200,'Type':'rent','Description':'For Month of September'}
  ];

  E_TYPES = [{label:'Electricity', value:'electricity'}, {label:'Rent', value:'rent'}]

  pageSettings = { pageSize: 10 };
  datalabel = { visible: true, name: 'text', position: 'Inside', template: '${point.x}: <b>${point.y} %</b>' };  
  legendSettings = { visible: false };
  editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode:'Dialog' };
  amtFmtOptions =  { format: 'C2', currency: 'INR' };
  toolbar:ToolbarItems[] = ['Add','Edit','Delete','Print','Search'];

  editTypeParams = {
    'Date':{ params: {value: new Date() }},
    'Number':{ params: { decimals: 2 }},
    'ExpenseType': {params: {
        allowFiltering: true,
        dataSource: new DataManager(this.E_TYPES),
        fields: { text: 'label', value: 'value' },
        query: new Query(),
        actionComplete: () => false
      }}
  };

  @ViewChild('grid') public grid!: GridComponent;

  constructor(){

  }

  ngOnInit():void{
    //this.data = []; // Get From DB
    setCurrencyCode('INR');
    loadCldr('./currencies.json');
  }

  dataBound(){
    this.grid.autoFitColumns(['Description']);
  }

  getPieData(){
    return [
      { 'Type': 'Chrome', Amount: 37 }, { 'Type': 'UC Browser', Amount: 17 },
      { 'Type': 'iPhone', Amount: 19 }, { 'Type': 'Others', Amount: 4 }, { 'Type': 'Opera', Amount: 11 }
    ];
  }

  actionBegin(args: EditEventArgs) {
    if (args.requestType === 'add') {
      for (const cols of this.grid.columns) {
        if ((cols as Column).field === 'ExpenseID') {
            (cols as Column).visible = false;
        } 
      }
    }
  }

  actionComplete(args: any) {
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      let dialog = args.dialog;
      if (dialog !== undefined){     
        //dialog.height = 450;
        dialog.element.style.maxHeight = "600px";
        // change the header of the dialog
        dialog.header = args.requestType === 'beginEdit' ? 'Edit Expense' : 'New Expense';
      }
    }
  }
}


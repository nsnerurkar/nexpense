import { Component, OnInit, ViewChild } from '@angular/core';
import { Column, DataStateChangeEventArgs, EditEventArgs, GridComponent, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { setCurrencyCode, loadCldr } from '@syncfusion/ej2-base';
import { Query, DataManager, RemoteSaveAdaptor  } from '@syncfusion/ej2-data';
import { DatabaseService } from './services/database.service';
import { ExpenseType } from './models/expense';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public data!: DataManager;  

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
        dataSource: new DataManager(this.getExpenseTypes()),
        fields: { text: 'label', value: 'value' },
        query: new Query(),
        actionComplete: () => false
      }}
  };

  pieData:any[] = [];

  primaryXAxis = {valueType: 'Category', title: 'Months'};
  primaryYAxis = {minimum: 0, maximum: 200000, interval: 50000, title: 'Amount'};

  monthData:any[] = [];
  
  @ViewChild('grid') public grid!: GridComponent;

  constructor(public dbSvc:DatabaseService){

  }

  ngOnInit():void{
    //this.data = []; // Get From DB
    setCurrencyCode('INR');
    loadCldr('./currencies.json');
    this.dbSvc.getExpenseData().subscribe(resp =>{
      this.data = new DataManager({
        json: resp,
        adaptor: new RemoteSaveAdaptor(),
        insertUrl: this.dbSvc.getUrl('Expense','create'),
        updateUrl: this.dbSvc.getUrl('Expense','update'),
        removeUrl: this.dbSvc.getUrl('Expense','delete'),
      });
      this.calcPieData();
    });
    this.calcMonthData();    
  }

  calcMonthData(){
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    let today = new Date();
    let startDate = new Date(today.getFullYear(), today.getMonth() - 5, 1);

    this.dbSvc.getExpenseByDateRange(startDate,today).subscribe((resp)=>{
      console.log(resp);
      let aggregate:any = {};

      resp.forEach(obj=>{
        const d = new Date(obj.Date);
        let month = monthNames[d.getMonth()];
        if (month in aggregate){
          aggregate[month] += obj.Amount;
        } else {
          aggregate[month] = obj.Amount;
        }
      });

      let pData:any[] = [];    
      Object.keys(aggregate).forEach((k) =>{
        pData.push({'month':k,amount:aggregate[k]});
      });
      
      this.monthData = pData;
    });
  }

  dataBound(){
    this.grid.autoFitColumns(['Description']);
  }

  getExpenseTypes(){
    let eTypesList:any[] = [];
    Object.keys(ExpenseType).forEach((k) => {
      eTypesList.push({'label':k,'value':ExpenseType[k as keyof typeof ExpenseType]});
    });
    return eTypesList;
  }

  calcPieData(){
    let dataJson = this.data.dataSource.json;
    let aggregate:any = {};
    dataJson?.forEach((obj:any)=>{
      if (obj.Type in aggregate){
        aggregate[obj.Type] += obj.Amount;
      } else {
        aggregate[obj.Type] = obj.Amount;
      }
    });
    
    let pData:any[] = [];
    const Sum = Object.values(aggregate).reduce<number>((a:any, b:any) => a + b,0);
    Object.keys(aggregate).forEach((k) =>{
      pData.push({'Type':k,Amount:Math.round(aggregate[k]*100/Sum)})
    })
    
    this.pieData = pData;
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
    if (args.requestType === 'add') {
      for (const cols of this.grid.columns) {
        if ((cols as Column).field === 'ExpenseID') {
            (cols as Column).visible = true;
        } 
      }
    }
    this.calcPieData();
    this.calcMonthData();
  }
}


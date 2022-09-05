import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { EditService, GridModule, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartModule, AccumulationChartAllModule, AccumulationChartModule, AccumulationDataLabelService } from '@syncfusion/ej2-angular-charts';
import { FormsModule } from '@angular/forms';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToolbarModule,
    GridModule,
    ChartModule,
    AccumulationChartAllModule,
    AccumulationChartModule,
    DatePickerAllModule,
    FormsModule,
    TextBoxModule
  ],
  providers: [
    AccumulationDataLabelService,
    ToolbarService,
    EditService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

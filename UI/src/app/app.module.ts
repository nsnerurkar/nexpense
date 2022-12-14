import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { EditService, GridModule, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartModule, AccumulationChartAllModule, AccumulationChartModule, AccumulationDataLabelService, ColumnSeriesService, CategoryService } from '@syncfusion/ej2-angular-charts';
import { FormsModule } from '@angular/forms';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { HttpClientModule } from '@angular/common/http';

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
    TextBoxModule,
    HttpClientModule
  ],
  providers: [
    AccumulationDataLabelService,
    ToolbarService,
    EditService,
    ColumnSeriesService,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MeterMgtComponent } from './meter-mgt/meter-mgt.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerBasicComponent } from './datepicker-basic/datepicker-basic.component';
import { ExpensesDetailsComponent } from './expenses-details/expenses-details.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustReportComponent } from './cust-report/cust-report.component';
import { TransactionDetailsComponent } from './transaction-details/transaction-details.component';
import { AllreportsComponent } from './allreports/allreports.component';
import { MeterReportComponent } from './meter-report/meter-report.component';
import { ExpensesReportComponent } from './expenses-report/expenses-report.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { DeleteMeterComponent } from './delete-meter/delete-meter.component';
import { DatePipe } from '@angular/common';
import { DeleteCustComponent } from './delete-cust/delete-cust.component';
import { CustUpdateComponent } from './cust-update/cust-update.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    MeterMgtComponent,
    DatepickerBasicComponent,
    ExpensesDetailsComponent,
    WelcomeComponent,
    CustomerDetailsComponent,
    CustReportComponent,
    TransactionDetailsComponent,
    AllreportsComponent,
    MeterReportComponent,
    ExpensesReportComponent,
    BalanceSheetComponent,
    DeleteMeterComponent,
    DeleteCustComponent,
    CustUpdateComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
   
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { meterDetails } from './models/meterDetails';
import { MeterMgtComponent } from './meter-mgt/meter-mgt.component';
import { ExpensesDetailsComponent } from './expenses-details/expenses-details.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { CustReportComponent } from './cust-report/cust-report.component';
import { AllreportsComponent } from './allreports/allreports.component';
import { MeterReportComponent } from './meter-report/meter-report.component';
import { ExpensesReportComponent } from './expenses-report/expenses-report.component';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { DeleteMeterComponent } from './delete-meter/delete-meter.component';
import { DeleteCustComponent } from './delete-cust/delete-cust.component';
import { CustUpdateComponent } from './cust-update/cust-update.component';
import { RegistrationComponent } from './registration/registration.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'meter', component: MeterMgtComponent},
  {path: 'expenses/:date/:totalSale/:lastBalance', component: ExpensesDetailsComponent},
  {path: 'expenses', component: ExpensesDetailsComponent},
  {path:'addCustomer',component: CustomerDetailsComponent},
  {path: 'custReport', component: CustReportComponent}, 
  {path: 'allReports', component: AllreportsComponent},
  {path: 'meterReports', component: MeterReportComponent},
  {path: 'expensesReport', component: ExpensesReportComponent},
  {path: 'balanceSheetReport', component: BalanceSheetComponent},
  {path: 'deleteMeter', component: DeleteMeterComponent} ,
  {path: 'deleteCustomer', component: DeleteCustComponent},
  {path: 'updateCustomer', component: CustUpdateComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

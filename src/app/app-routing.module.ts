import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ShiftsCanActivateService } from './shifts-can-activate.service';
import { UsersShiftsComponent } from './users-shifts/users-shifts.component';
import { AddShiftComponent } from './add-shift/add-shift.component';
import { EditShiftComponent } from './edit-shift/edit-shift.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { AllShiftsComponent } from './all-shifts/all-shifts.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AdminEditProfileComponent } from './admin-edit-profile/admin-edit-profile.component';
import { AdminEditShiftComponent } from './admin-edit-shift/admin-edit-shift.component';
import { UserSalaryComponent } from './user-salary/user-salary.component';
import { AllSalariesComponent } from './all-salaries/all-salaries.component';
import { ShowShiftsComponent } from './show-shifts/show-shifts.component';

const routes: Routes = [
  // {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component:LoginComponent},
  { path: 'user/login', component: LoginComponent },
  {path:'user/signup' , component:SignupComponent},
  {path:'all-users' , component:AllUsersComponent},
  {path:'all-shifts' , component:AllShiftsComponent},
  {path:'edit-profile' , component:EditProfileComponent},
  {path:'seeSalaries' , component:UserSalaryComponent},
  {path:'allSalaries' , component:AllSalariesComponent},
  {path:'admin/edit-profile/:id' , component:AdminEditProfileComponent},
  {path:'admin/edit-shift/:id' , component:AdminEditShiftComponent},
  {path:'admin/show-shifts/:id' , component:ShowShiftsComponent},
  {path:'home' , component:UsersShiftsComponent},
  {path:'edit-shift/:id' , component:EditShiftComponent},
  {path:'addShift' , component:AddShiftComponent},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

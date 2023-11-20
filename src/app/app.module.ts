import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { ShiftsCanActivateService } from './shifts-can-activate.service';
import { Route, Routes } from '@angular/router';
import { UsersShiftsComponent } from './users-shifts/users-shifts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './ang-material/ang-material.module';
import { AddShiftComponent } from './add-shift/add-shift.component';
import { AddShiftService } from './add-shift.service';
import { EditShiftComponent } from './edit-shift/edit-shift.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { AllShiftsComponent } from './all-shifts/all-shifts.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AdminEditProfileComponent } from './admin-edit-profile/admin-edit-profile.component';
import { AdminEditShiftComponent } from './admin-edit-shift/admin-edit-shift.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserSalaryComponent } from './user-salary/user-salary.component';
import { AllSalariesComponent } from './all-salaries/all-salaries.component';
import { ShowShiftsComponent } from './show-shifts/show-shifts.component';





@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    TopMenuComponent,
    UsersShiftsComponent,
    AddShiftComponent,
    EditShiftComponent,
    AllUsersComponent,
    AllShiftsComponent,
    EditProfileComponent,
    AdminEditProfileComponent,
    AdminEditShiftComponent,
    ForgotPasswordComponent,
    UserSalaryComponent,
    AllSalariesComponent,
    ShowShiftsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    ScreenTrackingService,UserTrackingService, AuthService, ShiftsCanActivateService , AddShiftService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

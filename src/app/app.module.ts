import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat'
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './shared/auth.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthGuard } from '@angular/fire/auth-guard';
import { FirestoreModule, getFirestore, provideFirestore } from '@angular/fire/firestore';
import { NavComponent } from './component/nav/nav.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { GroupsComponent } from './component/groups/groups.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { GrouppageComponent } from './component/groups/grouppage/grouppage.component';
import { AddgroupComponent } from './component/groups/addgroup/addgroup.component';
import { AddparticipantsComponent } from './component/groups/addparticipants/addparticipants.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import { EventpageComponent } from './component/groups/grouppage/eventpage/eventpage.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavComponent,
    GroupsComponent,
    GrouppageComponent,
    AddgroupComponent,
    AddparticipantsComponent,
    EventpageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatInputModule,
    MatListModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    FirestoreModule,
    provideFirestore(() => getFirestore()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    MatFormFieldModule, MatInputModule, MatNativeDateModule, MatDatepickerModule,
    MatCardModule,
  ],
  providers: [AuthService, AuthGuard, { provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent]
})
export class AppModule { }

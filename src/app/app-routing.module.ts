import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
import { AuthGuard } from '@angular/fire/auth-guard';
import { GroupsComponent } from './component/groups/groups.component';
import { GrouppageComponent } from './component/groups/grouppage/grouppage.component';
import { AddgroupComponent } from './component/groups/addgroup/addgroup.component';
import { AddparticipantsComponent } from './component/groups/addparticipants/addparticipants.component';
import { EventpageComponent } from './component/groups/grouppage/eventpage/eventpage.component';


const routes: Routes = [
  {path: '', redirectTo:'Home', pathMatch:'full'},
  {path: 'Login', component: LoginComponent},
  {path: 'Register', component: RegisterComponent},
  {path: 'Home', component: HomeComponent},
  {path: 'Groups', component: GroupsComponent},
  {path: 'Groups/:id', component: GrouppageComponent},
  {path: 'Add Group', component: AddgroupComponent},
  {path: 'Groups/:id/Add Participants', component: AddparticipantsComponent},
  {path: 'Groups/:id/:evid', component: EventpageComponent},
];

@NgModule({
  providers: [AuthGuard],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

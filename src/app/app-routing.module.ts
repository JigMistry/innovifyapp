import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [
  {path:'signup', component: SignupComponent},
  {path:'signin', component: SigninComponent},
  {path:'home', component: HomeComponent, canActivate:[AuthGuard]},
  {path: '', redirectTo:'/signin', pathMatch: 'full'},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule{ }

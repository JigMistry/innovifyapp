import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS  } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { MockBackendInterceptor } from './mockbackend-interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { UserService } from './users.service';
import { AuthGuard } from './guards/auth-guard';
import { AuthenticationService } from './services/authentication.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [
    UserService,
    {
         provide: HTTP_INTERCEPTORS,
         useClass: MockBackendInterceptor,
         multi: true
    },
    AuthGuard,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

@NgModule({
  declarations: [AppComponent, LoginPageComponent, UserComponent, AdminComponent, ForbiddenComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [{ provide: 'SERVER_URL', useValue: 'http://localhost:8080' }],
  bootstrap: [AppComponent],
})
export class AppModule {}

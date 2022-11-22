import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserAuthService } from './service/user-auth.service';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [UserAuthService],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [UserAuthService],
    data: { role: 'ROLE_ADMIN' },
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/account-management/login/login.component";
import {ForbiddenComponent} from "./auth/forbidden/forbidden.component";
import {PageNotFoundComponent} from "./auth/page-not-found/page-not-found.component";
import {ForgotPasswordComponent} from "./components/account-management/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./components/account-management/reset-password/reset-password.component";
import {TokenResetGuard} from "./core/guards/token-reset.guard";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent
  },
  {
    path: "reset-password/:token",
    component: ResetPasswordComponent,
    canActivate: [TokenResetGuard]
  },
  {
    path: "forbidden",
    component: ForbiddenComponent
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

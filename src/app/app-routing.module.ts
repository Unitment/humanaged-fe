import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/account-management/login/login.component";
import {ForbiddenComponent} from "./auth/forbidden/forbidden.component";
import {PageNotFoundComponent} from "./auth/page-not-found/page-not-found.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
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

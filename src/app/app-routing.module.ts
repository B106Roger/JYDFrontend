import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { LobbyComponent } from './component/lobby/lobby.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'lobby',
    component: LobbyComponent
  },
  {
    path: '**',
    redirectTo : ''
  }
];
/*
 Route {
    path?: string //瀏覽器上方的網址列的字串
    pathMatch?: string //當導航至此網址時要顯示的元件
    matcher?: UrlMatcher //網址列過濾器
    component?: Type
    redirectTo?: string //要轉址到那邊
    outlet?: string
    canActivate?: any[]
    canActivateChild?: any[]
    canDeactivate?: any[]
    canLoad?: any[]
    data?: Data //要傳入元件裡的資料
    resolve?: ResolveData
    children?: Routes
    loadChildren?: LoadChildren
    runGuardsAndResolvers?: RunGuardsAndResolvers
  }
*/
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

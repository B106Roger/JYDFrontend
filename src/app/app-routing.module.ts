import { AuthGuardService } from './services/auth-guard.service';
import { AutoGuardService } from './services/auto-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { LobbyComponent } from './component/lobby/lobby.component';
import { HistoryComponent } from './component/history/history.component';
import { AccountComponent } from './component/account/account.component';
import { ContactComponent } from './component/contact/contact.component';
import { GameComponent } from './component/game/game.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AutoGuardService]
  },
  {
    path: 'lobby',
    component: LobbyComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'game/:gameType/:gameName',
    component: GameComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'history',
    component: HistoryComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo : '/login'
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

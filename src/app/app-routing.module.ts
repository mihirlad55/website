import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component'
import {RedirectGuard} from './redirect-guard'

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'linkedin',
    canActivate: [RedirectGuard],
    component: RedirectGuard,
    data: {externalUrl: 'https://www.linkedin.com/in/mihirlad55'}
  },
  {
    path: 'github',
    canActivate: [RedirectGuard],
    component: RedirectGuard,
    data: {externalUrl: 'https://github.com/mihirlad55'}
  },
  {
    path: 'gitlab',
    canActivate: [RedirectGuard],
    component: RedirectGuard,
    data: {externalUrl: 'https://gitlab.com/mihirlad55'}
  },
  {
    path: 'meet',
    canActivate: [RedirectGuard],
    component: RedirectGuard,
    data: {externalUrl: 'https://usemotion.com/meet/mihirlad/work'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

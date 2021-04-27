import { WiffleBallTeamResolver } from './resolvers/wiffle-ball-team.resolver';
import { WiffleBallTeamComponent } from './pages/wiffle-ball-team/wiffle-ball-team.component';
import { WiffleBallRegisterResolver } from './resolvers/wiffle-ball-register.resolver';
import { PastTournamentsComponent } from './pages/past-tournaments/past-tournaments.component';
import { WiffleBallRegisterComponent } from './pages/wiffle-ball-register/wiffle-ball-register.component';
import { WiffleBallRulesComponent } from './pages/wiffle-ball-rules/wiffle-ball-rules.component';
import { WiffleBallDetailsComponent } from './pages/wiffle-ball-details/wiffle-ball-details.component';
import { BingoNightComponent } from './pages/bingo-night/bingo-night.component';
import { WiffleBallComponent } from './pages/wiffle-ball/wiffle-ball.component';
import { FundraisersComponent } from './pages/fundraisers/fundraisers.component';
import { DonateComponent } from './pages/donate/donate.component';
import { AboutComponent } from './pages/about/about.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_INITIALIZER } from '@angular/core';
import { ConfigurationService } from './services/configuration.service';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'about', component: AboutComponent },
  { path: 'donate', component: DonateComponent },
  { path: 'fundraisers', component: FundraisersComponent },
  {
    path: "wiffle-ball",
    redirectTo: "wiffle-ball/details"
  },
  {
    path: "wiffle-ball/team/:id",
    component: WiffleBallTeamComponent,
    resolve: { team: WiffleBallTeamResolver }
  },
  {
    path: 'wiffle-ball',
    component: WiffleBallComponent,
    children: [
      { path: 'details', component: WiffleBallDetailsComponent},
      { path: 'rules', component: WiffleBallRulesComponent},
      { path: 'register', component: WiffleBallRegisterComponent, resolve: [WiffleBallRegisterResolver] },
    ]
  },
  { path: 'bingo-night', component: BingoNightComponent },
  { path: 'tournaments', component: PastTournamentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

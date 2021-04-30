import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorService } from './services/color.service';
import { DonateComponent } from './pages/donate/donate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamService } from './services/team.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import { AboutComponent } from './pages/about/about.component';
import { FundraisersComponent } from './pages/fundraisers/fundraisers.component';
import { WiffleBallComponent } from './pages/wiffle-ball/wiffle-ball.component';
import { BingoNightComponent } from './pages/bingo-night/bingo-night.component';
import { WiffleBallDetailsComponent } from './pages/wiffle-ball-details/wiffle-ball-details.component';
import { WiffleBallRulesComponent } from './pages/wiffle-ball-rules/wiffle-ball-rules.component';
import { WiffleBallRegisterComponent } from './pages/wiffle-ball-register/wiffle-ball-register.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { PastTournamentsComponent } from './pages/past-tournaments/past-tournaments.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { ConfigurationService } from './services/configuration.service';
import { WiffleBallTeamComponent } from './pages/wiffle-ball-team/wiffle-ball-team.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    DonateComponent,
    FundraisersComponent,
    WiffleBallComponent,
    BingoNightComponent,
    WiffleBallDetailsComponent,
    WiffleBallRulesComponent,
    WiffleBallRegisterComponent,
    PastTournamentsComponent,
    WiffleBallTeamComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AngularFirestoreModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    GoogleMapsModule,
    NgxPayPalModule,
    MarkdownModule.forRoot()
  ],
  providers: [
    ConfigurationService,
    TeamService,
    ColorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}


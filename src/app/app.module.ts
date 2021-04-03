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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    FundraisersComponent,
    WiffleBallComponent,
    BingoNightComponent,
    WiffleBallDetailsComponent,
    WiffleBallRulesComponent,
    WiffleBallRegisterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    MarkdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

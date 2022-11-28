import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE } from '@angular/material';

import {
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
} from '@angular/material';
import {RouterModule, Routes} from '@angular/router';
import {MyService} from './services/my-service.service';

// COMPONENTS
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import { HelloComponent } from './hello.component';
import { NavigationService } from './navigation.service';
import { BackButtonDirective } from './back-button.directive';

// ROUTING
const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'signup', component: SignupComponent},
  {path: '**', component: LoginComponent}
];

// MODULES

@NgModule({
  imports: [
      BrowserAnimationsModule,
      BrowserModule,
      FormsModule,
      MatAutocompleteModule,
      MatBadgeModule,
      MatBottomSheetModule,
      MatButtonModule,
      MatButtonToggleModule,
      MatCardModule,
      MatCheckboxModule,
      MatDatepickerModule,
      MatDialogModule,
      MatDividerModule,
      MatExpansionModule,
      MatGridListModule,
      MatIconModule,
      MatInputModule,
      MatListModule,
      MatMenuModule,
      MatNativeDateModule,
      MatMomentDateModule,
      MatPaginatorModule,
      MatRadioModule,
      MatRippleModule,
      MatSelectModule,
      MatSidenavModule,
      MatSliderModule,
      MatSlideToggleModule,
      MatSnackBarModule,
      MatStepperModule,
      MatTableModule,
      MatTabsModule,
      MatToolbarModule,
      MatTooltipModule,
      FlexLayoutModule,
      ReactiveFormsModule,
      // ROUTING
      RouterModule.forRoot(
          appRoutes,
          //  { enableTracing: true } // <-- debugging purposes only
      )
  ],  // end imports
  declarations: [AppComponent, HomeComponent, LoginComponent, SignupComponent, HelloComponent, BackButtonDirective],    
  bootstrap: [AppComponent],
  providers: [MyService, NavigationService, {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],
  entryComponents: [LoginComponent]    
})
export class AppModule { }

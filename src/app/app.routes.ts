import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './login/login.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyProfileEditComponent } from './my-profile-edit/my-profile-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { RealestateComponent } from './realestate/realestate.component';
import { RealestateEditComponent } from './realestate-edit/realestate-edit.component';
import { RegistrationComponent } from './registration/registration.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'my-profile', component: MyProfileComponent },
  { path: 'my-profile-edit', component: MyProfileEditComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'realestate/:id', component: RealestateComponent },
  { path: 'realestate-edit', component: RealestateEditComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'search', component: SearchComponent },
  { path: '**', component: HomeComponent },
];

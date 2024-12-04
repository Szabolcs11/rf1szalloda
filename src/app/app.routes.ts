import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { LoginComponent } from './login/login.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UserProfileComponent } from './profile/profile.component';

import { RealestateComponent } from './realestate/realestate.component';
import { RealestateEditComponent } from './realestate-edit/realestate-edit.component';
import { RegistrationComponent } from './registration/registration.component';
import { SearchComponent } from './search/search.component';
import { AdminRealestateListComponent } from './admin-realestate-list/admin-realestate-list.component';
import { CreateRealEstateComponent } from './create-real-estate/create-real-estate.component';
import { AdminProfileListComponent } from './admin-profile-list/admin-profile-list.component';
import { AdminStatisticsComponent } from './admin-statistics/admin-statistics.component';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'my-profile', component: MyProfileComponent },
  { path: 'profile/:id', component: UserProfileComponent },
  { path: 'realestate/:id', component: RealestateComponent },
  { path: 'realestate-edit/:id', component: RealestateEditComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'search', component: SearchComponent },
  { path: 'create-real-estate', component: CreateRealEstateComponent },
  { path: 'admin-realestate-list', component: AdminRealestateListComponent},
  { path: 'admin-profile-list', component: AdminProfileListComponent},
  { path: 'admin-statistics', component: AdminStatisticsComponent},
  { path: '**', component: HomeComponent },
];

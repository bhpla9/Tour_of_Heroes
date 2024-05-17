import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [ // Specify routes here
{ path: 'heroes', component: HeroesComponent},
{ path: 'dashboard', component: DashboardComponent},
{ path: 'detail/:id', component: HeroDetailComponent }, // ':' is placeholder for value
{ path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // This is a default route 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

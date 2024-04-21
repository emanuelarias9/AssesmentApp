import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { TareaComponent } from './Pages/tarea/tarea.component';

export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'home',component:HomeComponent},
    {path:'tarea/:id',component:TareaComponent},
];

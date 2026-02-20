import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
// Pointing to 'task-list' instead of 'task-list.component'
import { TaskListComponent } from './components/task-list/task-list';
export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'tasks', component: TaskListComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];
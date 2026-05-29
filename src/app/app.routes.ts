import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Public auth routes
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
    children: [
      { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },

  // Protected routes
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'home', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
      { path: 'links', loadComponent: () => import('./features/links/links-list/links-list.component').then(m => m.LinksListComponent) },
      { path: 'links/new', loadComponent: () => import('./features/links/link-form/link-form.component').then(m => m.LinkFormComponent) },
      { path: 'links/:id/edit', loadComponent: () => import('./features/links/link-form/link-form.component').then(m => m.LinkFormComponent) },
      { path: 'tasks', loadComponent: () => import('./features/tasks/tasks-list/tasks-list.component').then(m => m.TasksListComponent) },
      { path: 'tasks/new', loadComponent: () => import('./features/tasks/task-form/task-form.component').then(m => m.TaskFormComponent) },
      { path: 'tasks/:id/edit', loadComponent: () => import('./features/tasks/task-form/task-form.component').then(m => m.TaskFormComponent) },
    ]
  },

  { path: '**', redirectTo: 'home' }
];

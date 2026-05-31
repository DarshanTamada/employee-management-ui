import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Dashboard } from './dashboard/dashboard';
import { EmployeeForm } from './components/employee-form/employee-form';
import { Profile } from './components/profile/profile';
import { authGuard } from './guards/auth.gurad';

export const routes: Routes = [

  // Default route
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  // Login
  {
    path: 'login',
    component: Login
  },

  // Register
  {
    path: 'register',
    component: Register
  },

  // Dashboard (protected)
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },

  // Employee List (protected)
  {
    path: 'employees',
    loadComponent: () => import('./components/employee-list/employee-list').then(m => m.EmployeeList),
    canActivate: [authGuard]
  },

  // Add employee (protected)
  {
    path: 'employees/add',
    component: EmployeeForm,
    canActivate: [authGuard]
  },

  // User Profile (protected)
  {
    path: 'profile',
    component: Profile,
    canActivate: [authGuard]
  },

  //unknown route
  {
    path: '**',
    redirectTo: '/login'
  }

];

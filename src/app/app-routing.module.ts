import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home/home.component';

import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { UpdateComponent } from './components/user/update/update.component';


import { EditorComponent } from './components/utils/editor/editor.component';
import { DetailsComponent } from './components/article/details/details.component';
import { ListComponent } from './components/article/list/list.component';
import { EditComponent } from './components/article/edit/edit.component';
import { ErrorComponent } from './components/other/error/error.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'update', component: UpdateComponent
  },
  {
    path: 'editor', component: EditorComponent
  },
  {
    path: 'articleDetails/:id', component: DetailsComponent
  },
  {
    path: 'articleEdit/:id', component: EditComponent
  },
  {
    path: 'articleList', component: ListComponent
  },
  {
    path: 'error', component: ErrorComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

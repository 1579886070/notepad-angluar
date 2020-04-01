import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@Angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { UpdateComponent } from './components/user/update/update.component';

import { EditorComponent } from './components/utils/editor/editor.component';

import { HttpService } from './service/http.service';
import { SessionService } from './service/session.service';
import { CommonService } from './service/common.service';


import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DetailsComponent } from './components/article/details/details.component';

import { ErrorComponent } from './components/other/error/error.component';
import { ListComponent } from './components/article/list/list.component';
import { EditComponent } from './components/article/edit/edit.component';
import { HtmlPipe } from './pipe/html.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    EditorComponent,
    DetailsComponent,
    ErrorComponent,
    ListComponent,
    EditComponent,
    HtmlPipe,
    UpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    CKEditorModule
  ],
  providers: [HttpService, SessionService, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }

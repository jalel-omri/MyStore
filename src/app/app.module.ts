import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ListeProduitComponent } from './produits/liste-produit/liste-produit.component';
import { LoginComponent } from './components/login/login.component';
import { ProduitsService } from './services/produits.service';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './components/register/register.component';
import { DetailProduitComponent } from './produits/detail-produit/detail-produit.component';
import { CommandComponent } from './produits/command/command.component';
import { ListCommandsComponent } from './produits/list-commands/list-commands.component';
import { Page404Component } from './components/page404/page404.component';
import { Page401Component } from './components/page401/page401.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
  
    HeaderComponent,

    ListeProduitComponent,
    LoginComponent,
    RegisterComponent,
    DetailProduitComponent,
    CommandComponent,
    ListCommandsComponent,
    Page404Component,
    Page401Component,
    HomeComponent,
  ],
  imports: [BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ProduitsService,AuthService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

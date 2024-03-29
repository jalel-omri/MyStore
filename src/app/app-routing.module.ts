import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListeProduitComponent } from './components/produits/liste-produit/liste-produit.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DetailProduitComponent } from './components/produits/detail-produit/detail-produit.component';
import { CommandComponent } from './components/produits/command/command.component';
import { ListCommandsComponent } from './components/produits/list-commands/list-commands.component';
import { Page401Component } from './components/page401/page401.component';
import { Page404Component } from './components/page404/page404.component';
import { AdminGuard } from './guard/admin.service';
import { AuthGuard } from './guard/auth.service';
import { CustomerGuard } from './guard/customer.service';
import { HomeComponent } from './components/home/home.component';



const routes: Routes = [ 
  {
   
    path:'',
    component:HomeComponent
  },
  {
   
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
   {
   path:'produits',
  canActivate: [AuthGuard] ,
   children: [
    {
      path: '',
      component: ListeProduitComponent,
     
    },
    {
      path: ':Idprod',
      component: DetailProduitComponent,
      
    }
  ]
  
},{
  path:'command',
  component:CommandComponent,canActivate: [AuthGuard,CustomerGuard] 
},{
  path:'Allcommands',
  component:ListCommandsComponent,
  canActivate: [AdminGuard]
},
{
  path: 'UNAUTHORIZED',
  component: Page401Component
},
{
  path: '**',
  component: Page404Component
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

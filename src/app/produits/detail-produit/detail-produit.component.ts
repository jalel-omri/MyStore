import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute } from '@angular/router';
import { ArrayType } from '@angular/compiler';
import { JsonPipe } from '@angular/common';
import { ProduitsService } from 'src/app/services/produits.service';
@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit {

  idProd:String;
  idUser:String;
  command=1;
 
   produit=null;
   inCart=false;
  achats=[];
  constructor(private _prodServ:ProduitsService,private route:ActivatedRoute) {
    
   }

  ngOnInit(): void {

    let token = localStorage.getItem('myTtoken');
    
     this.idProd = this.route.snapshot.paramMap.get('Idprod');
    

    this.getProduit();
    
    this.achats=JSON.parse(localStorage.getItem("achats"));
    let nbCommand=0;
    nbCommand=nbCommand+JSON.parse(localStorage.getItem("qte"));
    localStorage.setItem("qte",nbCommand.toString());
  }

  getProduit() {
    this._prodServ.getProduit(this.idProd).subscribe(
      res => {
        this.produit = res;
        console.log(res);
       
      },
      err => {
        console.log(err);
      }
    )
  }
  commander(){
    this.command=this.command+1;
    document.getElementById("qte").setAttribute("value",this.command
    .toString());
  }

  supprimer(){
    if(this.command!=1){
    this.command=this.command-1;
    document.getElementById("qte").setAttribute("value",this.command
    .toString());

    }
  }
  addToCart(){
    
    let achats=JSON.parse(localStorage.getItem("achats"));
    for(let a of achats){
      if(a.id==this.produit.id){
        this.inCart=true;
      }
    }
    if(!this.inCart){
      console.log("produit ajouté !");
      this.produit.quantity=this.command;
      achats.push(this.produit);
      this.achats=achats;
      localStorage.removeItem("achats");
      localStorage.setItem("achats",JSON.stringify(achats));
  //  document.getElementById("nbProd").textContent=this.cart.toString();
    

    let nbCommand=1;
    nbCommand=nbCommand+JSON.parse(localStorage.getItem("qte"));    
    localStorage.setItem("qte",nbCommand.toString());

    }else{
    console.log("produit existe déja !");}
    
  }

  removeFromCart(){
        
  }

}

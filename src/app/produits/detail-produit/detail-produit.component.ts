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
   
  achats=[];
  constructor(private _prodServ:ProduitsService,private route:ActivatedRoute) {
    
   }

  ngOnInit(): void {

    
     this.idProd = this.route.snapshot.paramMap.get('Idprod');
     this.achats=JSON.parse(localStorage.getItem("achats"));

    this.getProduit();
    
   
    let nbCommand=0;
    nbCommand=nbCommand+JSON.parse(localStorage.getItem("qte"));
    localStorage.setItem("qte",nbCommand.toString());
  }

  getProduit() {
    this._prodServ.getProduit(this.idProd).subscribe(
      res => {
        this.produit = res;
        this.produit.inCart=false;
        this.achats.forEach(element => {
          if(element.id==this.idProd){
            this.produit.inCart=true;
          }
        });
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
  
    if(!this.produit.inCart){
      console.log("produit ajouté !");
      this.produit.quantity=this.command;
      achats.push(this.produit);
      this.achats=achats;
      localStorage.removeItem("achats");
      localStorage.setItem("achats",JSON.stringify(achats));
  //  document.getElementById("nbProd").textContent=this.cart.toString();
      this.produit.inCart=true;

      let nbCommand=1;
      nbCommand=nbCommand+JSON.parse(localStorage.getItem("qte"));  
  
      localStorage.setItem("qte",nbCommand.toString());
    
  }
}

  removeFromCart(){
    this.produit.inCart=false;
    let achats=JSON.parse(localStorage.getItem("achats"));
    let index=0;
    for(let element of achats){
      if(this.produit.id==element.id)
       achats.splice(index, 1);
       index=index+1;
    };
    this.achats=achats;
    localStorage.removeItem("achats");
    localStorage.setItem("achats",JSON.stringify(achats));
    let nbCommand;
    nbCommand=JSON.parse(localStorage.getItem("qte"))-1;   
    localStorage.setItem("qte",nbCommand.toString());
  }

}

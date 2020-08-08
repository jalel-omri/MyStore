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

  idProd:String;  // the Id of the selected product
  
  command=1;    //Initialize the quantity to be bought to 1 exemplaire
   produit=null;  //Initialize the selected product to null
   
  achats=[];  // list that contains all commanded products
  constructor(private _prodServ:ProduitsService,private route:ActivatedRoute) {
    
   }

  ngOnInit(): void {

    // Set the Id of the selected product
     this.idProd = this.route.snapshot.paramMap.get('Idprod');
     //  Set the list of products to be commanded from the local storage
     this.achats=JSON.parse(localStorage.getItem("achats"));
    //Call the service to return the selected product by id
    this.getProduit();
    
    //initialize the total number of commands and save it to local storage
    let nbCommand=0;
    nbCommand=nbCommand+JSON.parse(localStorage.getItem("qte"));
    localStorage.setItem("qte",nbCommand.toString());
  }

  //function that returns the selected product by id 
  getProduit() {
    // call get product by od service
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

  //Increment the number of exemplaire of that product
  commander(){
    this.command=this.command+1;
    document.getElementById("qte").setAttribute("value",this.command
    .toString());
  }
  // Decrease the number of exemplaire of that product
  supprimer(){
    if(this.command!=1){
    this.command=this.command-1;
    document.getElementById("qte").setAttribute("value",this.command
    .toString());

    }
  }

  //Function to Add that product to the command list
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
  //remove that product from the command list
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

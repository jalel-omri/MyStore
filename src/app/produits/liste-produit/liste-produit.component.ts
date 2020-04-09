import { Component, OnInit } from '@angular/core';
import { ProduitsService } from 'src/app/services/produits.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { pathToFileURL } from 'url';
import { toBase64String } from '@angular/compiler/src/output/source_map';


@Component({
  selector: 'app-liste-produit',
  templateUrl: './liste-produit.component.html',
  styleUrls: ['./liste-produit.component.css']
})
export class ListeProduitComponent implements OnInit {
   produits=[];
   Cart=0;
  
   admin=false;
   command=1;
   achats=[];
   public selectedFile;
   receivedImageData: any;
   base64Data: any;
  convertedImage: any;
  imgURL: any;
  constructor(private _productService:ProduitsService) { }

  ngOnInit(): void {
    this._productService.getAllProducts().subscribe(
      (produitsFromDb)=>{
        this.produits = produitsFromDb
        console.log(produitsFromDb);
        this.isAdmin();
      },
      (error)=>{
        console.log(error);
      }
    )
    
    let nbCommand=0;nbCommand
    nbCommand=nbCommand+JSON.parse(localStorage.getItem("qte"));
    this.Cart=nbCommand;
    localStorage.setItem("qte",nbCommand.toString());
  }

  isAdmin(){
    const helper = new JwtHelperService();
    let token=localStorage.getItem("myToken");
    const decodedToken = helper.decodeToken(token);

    if (decodedToken.admin == "admin") {
      this.admin=true;
      
    }else {
      this.admin=false;
    }

  }

  addToCart(produit){
    let inCart=false;
    let achats=JSON.parse(localStorage.getItem("achats"));
    for(let a of achats){
      if(a.id==produit.id){
        inCart=true;
        console.log(a.id+" "+produit.id);
      }
    }
    if(!inCart){
      console.log("produit ajouté !");
      produit.quantity=this.command;
      achats.push(produit);
      this.achats=achats;
      localStorage.removeItem("achats");
      localStorage.setItem("achats",JSON.stringify(achats));
  //  document.getElementById("nbProd").textContent=this.cart.toString();
    

    let nbCommand=1;
    nbCommand=nbCommand+JSON.parse(localStorage.getItem("qte"));  
    this.Cart=nbCommand;  
    localStorage.setItem("qte",nbCommand.toString());

    }else{
    
    console.log("produit existe déja !");}
    
  }

  deleteProduit(produit){
      let indice = this.produits.indexOf(produit);
      this.produits.splice(indice, 1);
      let _id = produit.id ;
      this._productService.deleteProduit(_id).subscribe(
        result=>{
          console.log(result);
        },
        error=>console.log(error)      
      )
    
  }
  addProduct(){
    
    
    
   var nom= document.getElementById("namprod") as HTMLInputElement ;
   let namprod=nom.value;
    var description=document.getElementById("descprod") as HTMLInputElement;
    let descprod=description.value;
    var prix=document.getElementById("priprod") as HTMLInputElement;
    let priprod=prix.value;
    var discount= document.getElementById("discprod") as HTMLInputElement;
    let discprod=discount.value;
    var quantite= document.getElementById("quantity") as HTMLInputElement;
    let quantity=quantite.value;
 

    if(this.base64Data[1]==null||namprod==null||descprod==null||priprod==null){
      alert("veuillez donner toutes les informations nécessaires du produits !");
    }else{
      let  produit={
        "Improd":this.base64Data[1],
        "Namprod": namprod,
        "Descprod": descprod,
        "Priprod": JSON.parse(priprod),
        "Discprod": JSON.parse(discprod),
        "Stock":JSON.parse(quantity)
        }
        console.log(produit);
        this._productService.ajoutProduit(produit).subscribe(
          result=>{
            console.log(result);
          },
          error=>console.log(error)      
        )
      
       
    }

  }
  public  onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
      this.base64Data=this.imgURL.split(",");
    
  };

 }

 

}

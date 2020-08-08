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
   produits=[];   //contain the list of all products
   Cart=0;        //number of bought product 
  
   admin=false;   //boolean attribute indicates whether the user is admin or not initialized to false
   command=1;     //contain number of product exemplaire to be added to cart 
   achats=[];     //list of bought products
   public selectedFile; // contain the image of the new product
   base64Data: any;     //contain image of the product in 64 base format
  
  imgURL: any;    //contains the url of the new product image
  constructor(private _productService:ProduitsService) { }

  ngOnInit(): void {
    this.isAdmin();   //intialize admin/user indicator
    //get All products
    this._productService.getAllProducts().subscribe(
      (produitsFromDb)=>{
        this.produits = produitsFromDb
        console.log(produitsFromDb);
        let achats=JSON.parse(localStorage.getItem("achats"));
      
        this.produits.forEach(prod => {
          prod.inCart=false;    //initialize inCart attribute for each products as its not selected
          if(achats!=null){
          for(let element of achats){   //loop the achat list to determine which products are already selected
            if(element.id==prod.id)
             prod.inCart=true;
            }
          }
        });
        
      },
      (error)=>{
        console.log(error);
      }
    )
    //update number of selected product and store the value in the local storage
    let nbCommand=0;nbCommand
    nbCommand=nbCommand+JSON.parse(localStorage.getItem("qte"));
    this.Cart=nbCommand;
    localStorage.setItem("qte",nbCommand.toString());
  }
  //funciton to determine admin/user status
  isAdmin(){
    const helper = new JwtHelperService();
    let token=localStorage.getItem("myToken");  // using the generated token to decode the informations
    const decodedToken = helper.decodeToken(token);

    if (decodedToken.admin == "admin") {
      this.admin=true;
      
    }else {
      this.admin=false;
    }

  }

  //Here is the functions implemented to add a selected product to the Cart
  addToCart(i){
    
    let achats=JSON.parse(localStorage.getItem("achats"));
  
    if(!this.produits[i].inCart){
      console.log("produit ajouté !");
      this.produits[i].quantity=this.command;
      achats.push(this.produits[i]);
      this.achats=achats;
      localStorage.removeItem("achats");
      localStorage.setItem("achats",JSON.stringify(achats));

      this.produits[i].inCart=true;

      let nbCommand=1;
      nbCommand=nbCommand+JSON.parse(localStorage.getItem("qte"));  
      this.Cart=nbCommand;  
      localStorage.setItem("qte",nbCommand.toString());

    }
    
  }
  // function to drop a product from the cart
  dropFromCart(i,produit){
    this.produits[i].inCart=false;
    let achats=JSON.parse(localStorage.getItem("achats"));
    for(let element of achats){
      if(produit.id==element.id)
       achats.splice(i, 1);
    };
    this.achats=achats;
    localStorage.removeItem("achats");
    localStorage.setItem("achats",JSON.stringify(achats));
    let nbCommand;
    nbCommand=JSON.parse(localStorage.getItem("qte"))-1;  
    this.Cart=nbCommand;  
    localStorage.setItem("qte",nbCommand.toString());
  }

  //function that deletes a product listed
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

  //function to create and add new product in the store
  addProduct(){
    
    
   // extract the new product details inserted by the admin from the home page 
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
      //initialize the product caracteristics
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

  //Funtion to upload the image of the new product
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

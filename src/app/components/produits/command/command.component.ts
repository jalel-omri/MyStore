import { Component, OnInit } from '@angular/core';
import { ProduitsService } from 'src/app/services/produits.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css']
})
export class CommandComponent implements OnInit {
  produits=[]   //contains all the products to be requested
  Cart=0;     //Initialize the number of products in the Cart to 0 
  constructor(private _prodServ:ProduitsService,private router:Router) { }

  ngOnInit(): void {
    //set the list of requested products
    this.produits=JSON.parse(localStorage.getItem("achats"));
    //Set the number of products in the cart from the local storage
    let nbCommand=0;
    nbCommand=nbCommand+JSON.parse(localStorage.getItem("qte"));  
    this.Cart=nbCommand;  
  }

  // Send a command Demand for the selected products
  commander(){
    let token =localStorage.getItem('myToken');
        const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
    let commandList=[];
    let liste=JSON.parse(localStorage.getItem("achats"));
    // for each product I specify the ID of the customer and the quantity
    liste.forEach(element => {
      let object={
        "idAcheteur":JSON.parse(decodedToken.id),
        "idProduit":element.id,
        "quantity":element.quantity
      }
      commandList.push(object);
      
    });
    console.log(commandList);
    this._prodServ.commander(commandList).subscribe(
      result=>{
        console.log(result);
        alert("votre commande a été bien reçus cher client !");   //Alert that indicates that the demand is succefully received 
        this.router.navigate(['/produits']);    //navigate to the All products list
        
      },
      error=>console.log(error)      
    )

  }
}

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
  produits=[]
  Cart=0;
  constructor(private _prodServ:ProduitsService,private router:Router) { }

  ngOnInit(): void {
    this.produits=JSON.parse(localStorage.getItem("achats"));
    let nbCommand=0;
    nbCommand=nbCommand+JSON.parse(localStorage.getItem("qte"));  
    this.Cart=nbCommand;  
  }

  commander(){
    let token =localStorage.getItem('myToken');
        const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
    let commandList=[];
    let liste=JSON.parse(localStorage.getItem("achats"));
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
        alert("votre commande a été bien reçus cher client !");
        this.router.navigate(['/produits']);
        
      },
      error=>console.log(error)      
    )

  }
}

import { Component, OnInit } from '@angular/core';
import { ProduitsService } from 'src/app/services/produits.service';

@Component({
  selector: 'app-list-commands',
  templateUrl: './list-commands.component.html',
  styleUrls: ['./list-commands.component.css']
})
export class ListCommandsComponent implements OnInit {

  commands=[];
  
  constructor(private _prodServ:ProduitsService) {
    this._prodServ.getAllCommand().subscribe(
      (commandFromDb)=>{
        this.commands = commandFromDb
        
        console.log(commandFromDb);
      
      },
      (error)=>{
        console.log(error);
      }
    )
   }

  ngOnInit(): void {
  }

}

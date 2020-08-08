import { Component, OnInit } from '@angular/core';
import { ProduitsService } from 'src/app/services/produits.service';

@Component({
  selector: 'app-list-commands',
  templateUrl: './list-commands.component.html',
  styleUrls: ['./list-commands.component.css']
})
export class ListCommandsComponent implements OnInit {
  
  commands=[];  //contains the liste of all commands
  
  constructor(private _prodServ:ProduitsService) {
    // Use the GetAllCommands service
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

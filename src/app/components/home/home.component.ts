import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./cover.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
token:any;
  ngOnInit(): void {
    this.token=localStorage.getItem("myToken");
  }

}

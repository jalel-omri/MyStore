import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  //URL of GetAll products service
  private _getAllProductsUrl = "https://my4storeapi.herokuapp.com/api/produit";
  //URL of deleting a product service
  private _deleteProdUrl="https://my4storeapi.herokuapp.com/produit/DeleteProduit/";
  //URL to get a specific product by id service
  private _prodUrl="https://my4storeapi.herokuapp.com/produit/";
  //URL to pass a command service
  private _commandUrl="https://my4storeapi.herokuapp.com/command/"
  //URL to get ALL commands service
  private _getAllCommandUrl="https://my4storeapi.herokuapp.com/AllCommands/";
  //URL to add a new product service
  private _addProductUrl="https://my4storeapi.herokuapp.com/addProduct/";

  constructor(private http: HttpClient) { }
// function to get ALL products
getAllProducts() {
  
  return this.http.get<any>(this._getAllProductsUrl);
}

//function to delete a product by id
deleteProduit(id){
  return this.http.delete<any>(this._deleteProdUrl+id);
}

//function to get a product by id
getProduit(IdProd){
  return this.http.get<any>(this._prodUrl+ IdProd);
}

//function to command a list of products
commander(listCommand){
  return this.http.post<any>(this._commandUrl,listCommand);
}

//fucntion to get all received commands
getAllCommand(){
  return this.http.get<any>(this._getAllCommandUrl);
}

//function to add a new product
ajoutProduit(produit){
  return this.http.post<any>(this._addProductUrl,produit);
}
}
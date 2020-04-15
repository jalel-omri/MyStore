import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  private _getAllProductsUrl = "https://my4storeapi.herokuapp.com/api/produit";
  private _deleteProdUrl="https://my4storeapi.herokuapp.com/produit/DeleteProduit/";
  private _prodUrl="https://my4storeapi.herokuapp.com/produit/";
  private _commandUrl="https://my4storeapi.herokuapp.com/command/"
  private _getAllCommandUrl="https://my4storeapi.herokuapp.com/AllCommands/";
  private _addProductUrl="https://my4storeapi.herokuapp.com/addProduct/";
  constructor(private http: HttpClient) { }

getAllProducts() {
  
  return this.http.get<any>(this._getAllProductsUrl);
}

deleteProduit(id){
  return this.http.delete<any>(this._deleteProdUrl+id);
}
getProduit(IdProd){
  return this.http.get<any>(this._prodUrl+ IdProd);
}
commander(listCommand){
  return this.http.post<any>(this._commandUrl,listCommand);
}
getAllCommand(){
  return this.http.get<any>(this._getAllCommandUrl);
}
ajoutProduit(produit){
  return this.http.post<any>(this._addProductUrl,produit);
}
}
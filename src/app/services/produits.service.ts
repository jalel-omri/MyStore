import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
  private _getAllProductsUrl = "https://localhost:44337/api/produit";
  private _deleteProdUrl="https://localhost:44337/produit/DeleteProduit/";
  private _prodUrl="https://localhost:44337/produit/";
  private _commandUrl="https://localhost:44337/command/"
  private _getAllCommandUrl="https://localhost:44337/AllCommands/";
  private _addProductUrl="https://localhost:44337/addProduct/";
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
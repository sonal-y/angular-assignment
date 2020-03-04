///product/services/product.service.ts

import { environment } 
        from './../../environments/environment';

import { Characters } from './../models/characters';
import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


console.log("ENV ", environment)

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  private _characters = [];
  public characters$: BehaviorSubject <any> = new BehaviorSubject(this._characters);

  storage: Storage = window.localStorage;

  constructor(private http: HttpClient) { }

  // GET /api/products
  getProducts(): Observable<any> {
          //FIXME: implement get api for products
    return this.http
              .get<any>(`${environment.apiEndPoint}`);
  }

  searchCharacters(q: String): void{
    let search = [];
    let charactersJson = JSON.parse(this.storage.getItem("characters"));
    let characters = charactersJson.filter(o => o.name.toLowerCase().includes(q));
    console.log(characters);
    this.storage.setItem('characters',
      JSON.stringify(characters));
    this.characters = characters;
  }

  get characters(){
    return this._characters;
  }

  set characters(value: any){
    this._characters=value;
    //publish the value to subscriber
    this.characters$.next(this._characters);
  }


  // GET /api/products
  // searchProducts(q: string): Observable<Characters[]> {
  //   return this.http.get<Characters[]>(`${environment.apiEndPoint}`);
  // }

  // GET /api/products/100
  // getProduct(id: any): Observable<Product> {
  //   return this.http
  //         .get<Product>(`${environment.apiEndPoint}/api/products/${id}`);
  // }


  // Cache
  // Option 1. In memory JS [on refresh, removed] 
  // Option 2: browser storage: sessionStorage, per tab based, works on refresh
               // closing tab, remove the sessionStorage

  // Option 3: browser storage: localStorage: persistent,
               // remains active on closing browser, shutdown system

  //storage: Storage = window.localStorage;

  // GET /api/brands
  // getBrands(): Observable<Brand[]> {
  //   //todo: check if cache present, serve from cache

  //   // let brandsJson = this.storage.getItem("brands");
  //   // if (brandsJson) {
  //   //   console.log("Serving brands from cache ");

  //   //   //TODO: convert to observable
  //   //   let brands: Brand[] = <Brand[]> JSON.parse(brandsJson);
  //   //   return Observable.of(brands);
  //   // }

  //   console.log("Serving from server");
  //   return this.http
  //               .get<Brand[]>(`${environment.apiEndPoint}/api/brands`)
  // }

  // update existing product
  // PUT /api/products/12345
  // {{product json data}}
  // response
  // updated product data 


  // to create new  product
  // POST /api/products
  // {{product json data without id}}
  // response
  // updated product data with id 

  // saveProduct(product: Product):Observable<Product> {
  //   if (product.id) { // update
  //     return this.http
  //           .put<Product>(`${environment.apiEndPoint}/api/products/${product.id}`,
  //                         product);
  //   } else { //create
  //     return this.http
  //     .post<Product>(`${environment.apiEndPoint}/api/products`,
  //                   product);
  //   }
  // }

  // deleteProduct(id: number): Observable<any>{
  //   return this.http    
  //           .delete(`${environment.apiEndPoint}/api/products/${id}`);
  // }

}
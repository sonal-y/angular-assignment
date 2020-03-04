import { Component, OnInit, Input } from '@angular/core';
import { CharactersService } from '../../services/characters.service';
import { Observable, Subscription } from 'rxjs';
import { Characters } from '../../models/characters';
import { ActivatedRoute } from '@angular/router';
import {of} from 'rxjs';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  fieldName: string;

  @Input()
  operator: string;

  @Input()
  filterChecked:any;

  characters$ : Observable<any>;
  charactersSubscription: Subscription;
  
  constructor(private charactersService: CharactersService,
              private activatedRoute: ActivatedRoute) { 

              
              }

  ngOnInit() {
 
    this.charactersService.getProducts()
    .subscribe(data => {
      
      console.log(data.results);
      this.charactersService.storage.setItem('characters',
      JSON.stringify(data.results));
      this.characters$ = data.results;
    });

    //subscribe for amount$ changes
    this.charactersSubscription = this.charactersService
        .characters$
        .subscribe ((value:any) => {
          console.log('summary amount subscriber ',value);
          this.characters$ = value;
        });

  }

  // ngOnDestroy(){
  //   console.log('destroy  called');
  //   this.charactersSubscription.unsubscribe();
  // }




}

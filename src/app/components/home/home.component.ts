import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import { map, filter, debounceTime } from 'rxjs/operators';
import { CharactersService } from 'src/app/services/characters.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  searchText: string;
  group: FormGroup; //form whole
  searchControl: FormControl;//input box - one particular
  characters$: Observable<any>;
  operator: string;
  expectedValue: number;
  filterChecked: any;
  filterItems = [
    {
      value: 'human',
      checked: false,
      name: 'species'
    },
    {
      value: 'mythology',
      checked: false,
      name: 'species'
    },
    {
      value: 'other species',
      checked: false,
      name: 'species'
    },
    {
      value: 'male',
      checked: false,
      name: 'gender'
    },
    {
      value: 'female',
      checked: false,
      name: 'gender'
    },
    {
      value: 'unknown',
      checked: false,
      name: 'origin'
    },
    {
      value: 'post-apocalyptic earth',
      checked: false,
      name: 'origin'
    },
    {
      value: 'nuptia 4',
      checked: false,
      name: 'origin'
    },
    {
      value: 'other origins',
      checked: false,
      name: 'origin'
    }
  ];

  checked() {
    this.filterChecked = this.filterItems.filter(item => { return item.checked; });
    return this.filterItems.filter(item => { return item.checked; });
  }

  constructor(private charactersService: CharactersService,
              private builder: FormBuilder) { 
    this.searchControl = new FormControl('');

    this.group = this.builder.group({
      //html binding name: control object
      'search': this.searchControl
    });
  }

  ngOnInit() {
    this.searchControl
      .valueChanges
      .pipe (filter (value => !!value)) //non empty strings are true
      .pipe(map (value => value.trim().toLowerCase()))
      .pipe(debounceTime(500))
      .subscribe( value => {
        console.log(value);

        this.searchText = value;


         this.charactersService.searchCharacters(value);
      })
  }

}

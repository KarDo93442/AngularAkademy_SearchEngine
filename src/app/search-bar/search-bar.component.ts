import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { SearchService } from '../search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  
  searchedPhrase = new FormControl('');
  results: any[] = [];
  searchResults: any[] = [];

  constructor(private searchService : SearchService) { }

  ngOnInit(): void {
    this.getSearchResults();
  }

  getSearchResults(): void {
    this.searchService.getResultList().subscribe((sr : any) => {Object.assign(this.searchResults, sr);});
  }

  searchOnKeyUp(event : any) {
    let input = event.target.value;

    if (input.length > 0) {
      this.results = this.searchFromSuggestions(this.searchResults, input);
    }
  }

  searchFromSuggestions(suggestions : any, regex :any) {
    let matchingPhrases = [];
    let i;

    for (i = 0; i < suggestions.length; i++) {
      if (suggestions[i].match(regex)) {
        matchingPhrases.push(suggestions[i]);
      }
    }
    return matchingPhrases;
  }

  searchOnGoogle() {
    let url = "https://www.google.com/search?q=" + this.searchedPhrase.value;
    window.open(url);
  }

}

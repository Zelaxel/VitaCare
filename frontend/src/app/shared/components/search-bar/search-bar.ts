import { Component,EventEmitter,Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  searchTerm: string = ''
  @Output() searchChange = new EventEmitter<string>();

  onSearchInput() {
    this.searchChange.emit(this.searchTerm.toLowerCase()); 
  }
}

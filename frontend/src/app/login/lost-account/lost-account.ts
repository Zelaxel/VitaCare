import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-lost-account',
  imports: [FormsModule],
  templateUrl: './lost-account.html',
  styleUrl: './lost-account.css',
})
export class LostAccount {
  email = '';
}
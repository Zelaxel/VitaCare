import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'

@Component({
  standalone: true,
  selector: 'app-email-sent',
  imports: [RouterLink],
  templateUrl: './email-sent.html',
  styleUrl: './email-sent.css',
})
export class EmailSent {}
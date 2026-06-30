import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css'
})
export class NotFoundComponent implements OnInit {
  homeLink = '/home';
  homeText = 'Please return to the Home Page';

  constructor(private router: Router) {}

  ngOnInit() {
    if (this.router.url.startsWith('/admin')) {
      this.homeLink = '/admin/home';
      this.homeText = 'Please return to the Admin Dashboard';
    }
  }
}

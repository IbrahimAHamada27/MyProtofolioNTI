import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SiteInfo } from '../../core/models/site-info.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent implements OnInit {
  isMobileMenuOpen = false;
  isDarkMode = false;
  siteInfo: SiteInfo = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchSiteInfo();
    this.checkTheme();
  }

  checkTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      document.body.classList.add('dark-theme');
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  fetchSiteInfo() {
    this.http.get<SiteInfo>('http://localhost:3000/api/siteinfo').subscribe({
      next: (data) => {
        this.siteInfo = data;
      },
      error: (error) => {
        console.error('Failed to fetch site info', error);
      }
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}

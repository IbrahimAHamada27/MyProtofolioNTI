import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { SiteInfo } from './core/models/site-info.model';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  constructor(private titleService: Title, private http: HttpClient) {}

  ngOnInit() {
    this.fetchSiteInfo();
  }

  fetchSiteInfo() {
    this.http.get<SiteInfo>('http://localhost:3000/api/siteinfo').subscribe({
      next: (siteInfo) => {
        if (siteInfo.brandName) {
          this.titleService.setTitle(siteInfo.brandName);
        }

        if (siteInfo.logoImage) {
          let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
          if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
          }
          link.href = siteInfo.logoImage;
        }
      },
      error: (error) => {
        console.error('Failed to fetch site info for tab', error);
      }
    });
  }
}

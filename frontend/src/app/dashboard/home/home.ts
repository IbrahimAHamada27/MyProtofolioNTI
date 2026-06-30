import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { SiteInfo } from '../../core/models/site-info.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class DashboardHomeComponent implements OnInit {
  siteInfo: SiteInfo = {};

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchSiteInfo();
  }

  async fetchSiteInfo() {
    try {
      const response = await lastValueFrom(this.http.get<SiteInfo>('http://localhost:3000/api/siteinfo'));
      this.siteInfo = response;
    } catch (error) {
      console.error('Failed to fetch site info', error);
      alert('Failed to fetch site info');
    }
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && typeof e.target.result === 'string') {
          this.siteInfo.profileImage = e.target.result; // Base64 string
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onLogoSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target && typeof e.target.result === 'string') {
          this.siteInfo.logoImage = e.target.result; // Base64 string
        }
      };
      reader.readAsDataURL(file);
    }
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    
    const payload = {
      ...this.siteInfo,
      ...(Object.fromEntries((data as any).entries()))
    };

    try {
      await lastValueFrom(this.http.put('http://localhost:3000/api/siteinfo', payload));
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Failed to update site info', error);
      alert('Failed to update site info.');
    }
  }
}

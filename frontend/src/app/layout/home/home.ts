import { Component, OnInit } from '@angular/core';

import { SiteInfo } from '../../core/models/site-info.model';
import { lastValueFrom } from 'rxjs';
import { SiteInfoService } from '../../core/services/site-info.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  constructor(private siteInfoService: SiteInfoService) {}

  siteInfo: SiteInfo = {};

  ngOnInit() {
    this.fetchSiteInfo();
  }

  async fetchSiteInfo() {
    try {
      const response = await lastValueFrom(this.siteInfoService.getSiteInfo());
      this.siteInfo = response;
    } catch (error) {
      console.error('Failed to fetch site info', error);
    }
  }
}

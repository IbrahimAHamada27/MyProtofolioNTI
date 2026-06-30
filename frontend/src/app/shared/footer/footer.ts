import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { SiteInfo } from '../../core/models/site-info.model';
import { Project } from '../../core/models/project.model';
import { Skill } from '../../core/models/skill.model';
import { Message } from '../../core/models/message.model';
import { Certificate } from '../../core/models/certificate.model';
import { Experience } from '../../core/models/experience.model';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent implements OnInit {
  constructor(private http: HttpClient) {}

  siteInfo: SiteInfo = {};

  ngOnInit() {
    this.fetchSiteInfo();
  }

  async fetchSiteInfo() {
    try {
      const response = await lastValueFrom(this.http.get<SiteInfo>('http://localhost:3000/api/siteinfo'));
      this.siteInfo = response;
    } catch (error) {
      console.error('Failed to fetch site info', error);
    }
  }
}

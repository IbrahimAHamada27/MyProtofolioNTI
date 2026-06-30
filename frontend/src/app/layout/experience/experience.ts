import { Component, OnInit } from '@angular/core';

import { Experience } from '../../core/models/experience.model';
import { lastValueFrom } from 'rxjs';
import { ExperienceService } from '../../core/services/experience.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.css'
})
export class ExperienceComponent implements OnInit {
  constructor(private experienceService: ExperienceService) {}

  experiences: Experience[] = [];

  ngOnInit() {
    this.fetchExperiences();
  }

  async fetchExperiences() {
    try {
      const response = await lastValueFrom(this.experienceService.getExperiences());
      this.experiences = response;
    } catch (error) {
      console.error('Failed to fetch experiences', error);
    }
  }
}

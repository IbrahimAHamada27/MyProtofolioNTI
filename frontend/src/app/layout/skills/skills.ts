import { Component, OnInit } from '@angular/core';

import { Skill } from '../../core/models/skill.model';
import { lastValueFrom } from 'rxjs';
import { SkillService } from '../../core/services/skill.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class SkillsComponent implements OnInit {
  constructor(private skillService: SkillService) {}

  skills: Skill[] = [];

  ngOnInit() {
    this.fetchSkills();
  }

  async fetchSkills() {
    try {
      const response = await lastValueFrom(this.skillService.getSkills());
      this.skills = response;
    } catch (error) {
      console.error('Failed to fetch skills', error);
    }
  }
}

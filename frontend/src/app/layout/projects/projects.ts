import { Component, OnInit } from '@angular/core';

import { Project } from '../../core/models/project.model';
import { lastValueFrom } from 'rxjs';
import { ProjectService } from '../../core/services/project.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class ProjectsComponent implements OnInit {
  constructor(private projectService: ProjectService) {}

  projects: Project[] = [];

  ngOnInit() {
    this.fetchProjects();
  }

  async fetchProjects() {
    try {
      const response = await lastValueFrom(this.projectService.getProjects());
      this.projects = response;
    } catch (error) {
      console.error('Failed to fetch projects', error);
    }
  }
}

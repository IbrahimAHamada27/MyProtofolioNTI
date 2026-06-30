import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { SiteInfo } from '../../core/models/site-info.model';
import { Project } from '../../core/models/project.model';
import { Skill } from '../../core/models/skill.model';
import { Message } from '../../core/models/message.model';
import { Certificate } from '../../core/models/certificate.model';
import { Experience } from '../../core/models/experience.model';
import { lastValueFrom } from 'rxjs';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-projects',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-projects.html',
  styleUrl: './list-projects.css'
})
export class ListProjectsComponent implements OnInit {
  projects: Project[] = [];
  showForm = false;
  editingId: string | undefined = undefined;
  
  formData = {
    title: '',
    description: '',
    link: '',
    technologies: ''
  };

  constructor(private cdr: ChangeDetectorRef, private http: HttpClient) {}

  ngOnInit() {
    this.fetchProjects();
  }

  async fetchProjects() {
    try {
      const response = await lastValueFrom(this.http.get<Project[]>('http://localhost:3000/api/projects'));
      this.projects = response;
    } catch (error) {
      console.error('Failed to fetch projects', error);
    }
  }

  async deleteProject(id: string | undefined) {
    if (!id || !confirm('Are you sure you want to delete this project?')) return;
    try {
      await lastValueFrom(this.http.delete(`http://localhost:3000/api/projects/${id}`));
      this.projects = this.projects.filter(p => p._id !== id);
        alert('Project deleted successfully');
        this.cdr.detectChanges();
    } catch (error) {
      console.error('Failed to delete project', error);
      alert('Failed to delete project');
    }
  }

  editProject(project: Project) {
    this.editingId = project._id;
    this.formData = {
      title: project.title,
      description: project.description,
      link: project.link,
      technologies: project.technologies.join(', ')
    };
    this.showForm = true;
  }

  cancelEdit() {
    this.showForm = false;
    this.editingId = undefined;
    this.formData = { title: '', description: '', link: '', technologies: '' };
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    
    const techs = this.formData.technologies.split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0);
    
    const payload = {
      title: this.formData.title,
      description: this.formData.description,
      link: this.formData.link,
      technologies: techs
    };

    try {
      const url = this.editingId 
        ? `http://localhost:3000/api/projects/${this.editingId}`
        : 'http://localhost:3000/api/projects';
        
      const method = this.editingId ? 'PUT' : 'POST';

      let updatedItem: Project;
      if (this.editingId) {
        updatedItem = await lastValueFrom(this.http.put<Project>(url, payload));
      } else {
        updatedItem = await lastValueFrom(this.http.post<Project>(url, payload));
      }

      if (this.editingId) {
        const idx = this.projects.findIndex(p => p._id === this.editingId);
        if (idx !== -1) {
          this.projects[idx] = updatedItem;
        }
      } else {
        this.projects.unshift(updatedItem);
      }
      this.projects = [...this.projects]; // Force array reference change

      alert(`Project ${this.editingId ? 'updated' : 'added'} successfully!`);
      this.cancelEdit();
      this.cdr.detectChanges();
    } catch (error) {
      console.error(`Error ${this.editingId ? 'updating' : 'adding'} project:`, error);
      alert('Error connecting to backend.');
    }
  }
}

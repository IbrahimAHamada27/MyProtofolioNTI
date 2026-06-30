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
  selector: 'app-experience',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './experience.html',
  styleUrl: './experience.css'
})
export class DashboardExperienceComponent implements OnInit {
  experiences: Experience[] = [];
  showForm = false;
  editingId: string | undefined = undefined;
  formData = { role: '', company: '', years: '', desc: '' };

  constructor(private cdr: ChangeDetectorRef, private http: HttpClient) {}

  ngOnInit() {
    this.fetchExperiences();
  }

  async fetchExperiences() {
    try {
      const response = await lastValueFrom(this.http.get<Experience[]>('http://localhost:3000/api/experience'));
      this.experiences = response;
    } catch (error) {
      console.error('Failed to fetch experiences', error);
    }
  }

  async deleteExperience(id: string | undefined) {
    if (!id || !confirm('Are you sure?')) return;
    try {
      await lastValueFrom(this.http.delete(`http://localhost:3000/api/experience/${id}`));
      this.experiences = this.experiences.filter(e => e._id !== id);
        alert('Experience deleted successfully');
        this.cdr.detectChanges();
    } catch (error) {
      console.error('Failed to delete experience', error);
      alert('Failed to delete experience');
    }
  }

  editExperience(exp: Experience) {
    this.editingId = exp._id;
    this.formData = {
      role: exp.role,
      company: exp.company,
      years: exp.years,
      desc: exp.desc
    };
    this.showForm = true;
  }

  cancelEdit() {
    this.showForm = false;
    this.editingId = undefined;
    this.formData = { role: '', company: '', years: '', desc: '' };
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    const payload = this.formData;

    try {
      const url = this.editingId 
        ? `http://localhost:3000/api/experience/${this.editingId}`
        : 'http://localhost:3000/api/experience';
      const method = this.editingId ? 'PUT' : 'POST';

      let updatedItem: Experience;
      if (this.editingId) {
        updatedItem = await lastValueFrom(this.http.put<Experience>(url, payload));
      } else {
        updatedItem = await lastValueFrom(this.http.post<Experience>(url, payload));
      }

      if (this.editingId) {
        const idx = this.experiences.findIndex(x => x._id === this.editingId);
        if (idx !== -1) {
          this.experiences[idx] = updatedItem;
        }
      } else {
        this.experiences.unshift(updatedItem);
      }
      this.experiences = [...this.experiences];

      alert(`Item ${this.editingId ? 'updated' : 'added'} successfully`);
      this.cancelEdit();
      this.cdr.detectChanges();
    } catch (error) {
      console.error(`Failed to ${this.editingId ? 'update' : 'add'} experience`, error);
      alert('Error connecting to backend');
    }
  }
}

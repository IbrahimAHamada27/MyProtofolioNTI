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
  selector: 'app-certificates',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './certificates.html',
  styleUrl: './certificates.css'
})
export class DashboardCertificatesComponent implements OnInit {
  certificates: Certificate[] = [];
  showForm = false;
  editingId: string | undefined = undefined;
  formData = { title: '', issuer: '', date: '' };
  selectedFile: File | null = null;

  constructor(private cdr: ChangeDetectorRef, private http: HttpClient) {}

  ngOnInit() {
    this.fetchCertificates();
  }

  async fetchCertificates() {
    try {
      const response = await lastValueFrom(this.http.get<Certificate[]>('http://localhost:3000/api/certificates'));
      this.certificates = response;
    } catch (error) {
      console.error('Failed to fetch certificates', error);
    }
  }

  async deleteCertificate(id: string | undefined) {
    if (!id || !confirm('Are you sure?')) return;
    try {
      await lastValueFrom(this.http.delete(`http://localhost:3000/api/certificates/${id}`));
      this.certificates = this.certificates.filter(c => c._id !== id);
        alert('Certificate deleted successfully');
        this.cdr.detectChanges();
    } catch (error) {
      console.error('Failed to delete certificate', error);
      alert('Failed to delete certificate');
    }
  }

  editCertificate(cert: Certificate) {
    this.editingId = cert._id;
    this.formData = {
      title: cert.title,
      issuer: cert.issuer,
      date: cert.date
    };
    this.showForm = true;
  }

  cancelEdit() {
    this.showForm = false;
    this.editingId = undefined;
    this.formData = { title: '', issuer: '', date: '' };
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    const payload = this.formData;

    try {
      const url = this.editingId 
        ? `http://localhost:3000/api/certificates/${this.editingId}`
        : 'http://localhost:3000/api/certificates';
      const method = this.editingId ? 'PUT' : 'POST';

      let updatedItem: Certificate;
      if (this.editingId) {
        updatedItem = await lastValueFrom(this.http.put<Certificate>(url, payload));
      } else {
        updatedItem = await lastValueFrom(this.http.post<Certificate>(url, payload));
      }
      if (this.editingId) {
          const idx = this.certificates.findIndex(c => c._id === this.editingId);
          if (idx !== -1) {
            this.certificates[idx] = updatedItem;} else {
          this.certificates.unshift(updatedItem);
        }
      this.certificates = [...this.certificates]; // Force array reference change

        alert(`Certificate ${this.editingId ? 'updated' : 'added'} successfully`);
        this.cancelEdit();
        this.cdr.detectChanges();
      } else {
        alert(`Failed to ${this.editingId ? 'update' : 'add'} certificate`);
      }
    } catch (error) {
      console.error(`Failed to ${this.editingId ? 'update' : 'add'} certificate`, error);
      alert('Error connecting to backend');
    }
  }
}

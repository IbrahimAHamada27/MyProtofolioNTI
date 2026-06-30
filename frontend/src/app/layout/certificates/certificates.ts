import { Component, OnInit } from '@angular/core';

import { Certificate } from '../../core/models/certificate.model';
import { lastValueFrom } from 'rxjs';
import { CertificateService } from '../../core/services/certificate.service';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [],
  templateUrl: './certificates.html',
  styleUrl: './certificates.css'
})
export class CertificatesComponent implements OnInit {
  constructor(private certificateService: CertificateService) {}

  certificates: Certificate[] = [];

  ngOnInit() {
    this.fetchCertificates();
  }

  async fetchCertificates() {
    try {
      const response = await lastValueFrom(this.certificateService.getCertificates());
      this.certificates = response;
    } catch (error) {
      console.error('Failed to fetch certificates', error);
    }
  }
}

import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { SiteInfo } from '../../core/models/site-info.model';
import { lastValueFrom } from 'rxjs';
import { SiteInfoService } from '../../core/services/site-info.service';
import { MessageService } from '../../core/services/message.service';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent implements OnInit {
  siteInfo: SiteInfo = {};

  constructor(
    private http: HttpClient,
    private siteInfoService: SiteInfoService,
    private messageService: MessageService
  ) {}

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

  async onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    const payload : Record<string, string> = {};

    data.forEach((value, key) => {
      if (typeof value === 'string') {
        payload[key] = value;
      }
    });

    try {
      // 1. Always save to local database
      await lastValueFrom(this.messageService.sendMessage(payload));

      // 2. Check if Email API is configured and forward
      let emailSuccess = true;
      const provider = this.siteInfo.emailProvider;

      if (provider === 'emailjs' && this.siteInfo.emailjsServiceId) {
        const emailjsPayload = {
          service_id: this.siteInfo.emailjsServiceId,
          template_id: this.siteInfo.emailjsTemplateId,
          user_id: this.siteInfo.emailjsPublicKey,
          template_params: {
            from_name: payload['name'],
            from_email: payload['email'],
            message: payload['message']
          }
        };
        try {
          await lastValueFrom(this.http.post('https://api.emailjs.com/api/v1.0/email/send', emailjsPayload));
          emailSuccess = true;
        } catch { emailSuccess = false; }
      }
      else if (provider === 'formspree' && this.siteInfo.formspreeUrl) {
        try {
          await lastValueFrom(this.http.post(this.siteInfo.formspreeUrl, payload));
          emailSuccess = true;
        } catch { emailSuccess = false; }
      }
      else if (provider === 'web3forms' && this.siteInfo.web3formsAccessKey) {
        payload['access_key'] = this.siteInfo.web3formsAccessKey;
        try {
          await lastValueFrom(this.http.post('https://api.web3forms.com/submit', payload));
          emailSuccess = true;
        } catch { emailSuccess = false; }
      }

      if (emailSuccess) {
        alert('Message sent successfully!');
        form.reset();
      } else {
        alert('Saved locally, but failed to forward email.');
      }
    } catch (error) {
      console.error('Failed to send message', error);
      alert('Error connecting to server.');
    }
  }
}

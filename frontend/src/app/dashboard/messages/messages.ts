import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { SiteInfo } from '../../core/models/site-info.model';
import { Project } from '../../core/models/project.model';
import { Skill } from '../../core/models/skill.model';
import { Message } from '../../core/models/message.model';
import { Certificate } from '../../core/models/certificate.model';
import { Experience } from '../../core/models/experience.model';
import { lastValueFrom } from 'rxjs';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './messages.html',
  styleUrl: './messages.css'
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchMessages();
  }

  async fetchMessages() {
    try {
      const response = await lastValueFrom(this.http.get<Message[]>('http://localhost:3000/api/messages'));
      this.messages = response;
    } catch (error) {
      console.error('Failed to fetch messages', error);
    }
  }

  async deleteMessage(id: string | undefined) {
    if (!id || !confirm('Are you sure you want to delete this message?')) return;
    try {
      await lastValueFrom(this.http.delete(`http://localhost:3000/api/messages/${id}`));
      this.messages = this.messages.filter(m => m._id !== id);
      alert('Message deleted successfully');
    } catch (error) {
      console.error('Failed to delete message', error);
      alert('Failed to delete message');
    }
  }
}

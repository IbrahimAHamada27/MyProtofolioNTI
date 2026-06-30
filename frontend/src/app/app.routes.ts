import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout';
import { HomeComponent } from './layout/home/home';
import { SkillsComponent } from './layout/skills/skills';
import { ProjectsComponent } from './layout/projects/projects';
import { ContactComponent } from './layout/contact/contact';
import { CertificatesComponent } from './layout/certificates/certificates';
import { ExperienceComponent } from './layout/experience/experience';

import { DashboardComponent } from './dashboard/dashboard/dashboard';
import { DashboardHomeComponent } from './dashboard/home/home';
import { ListProjectsComponent } from './dashboard/list-projects/list-projects';
import { MessagesComponent } from './dashboard/messages/messages';
import { DashboardCertificatesComponent } from './dashboard/certificates/certificates';
import { DashboardExperienceComponent } from './dashboard/experience/experience';

import { SkillsComponent as DashboardSkillsComponent } from './dashboard/skills/skills';
import { NotFoundComponent } from './not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'skills', component: SkillsComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'certificates', component: CertificatesComponent },
      { path: 'experience', component: ExperienceComponent },
      { path: 'contact', component: ContactComponent }
    ]
  },
  {
    path: 'admin',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: DashboardHomeComponent },
      { path: 'list-projects', component: ListProjectsComponent },
      { path: 'certificates', component: DashboardCertificatesComponent },
      { path: 'experience', component: DashboardExperienceComponent },
      { path: 'skills', component: DashboardSkillsComponent },
      { path: 'messages', component: MessagesComponent },
      { path: '**', component: NotFoundComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }
];

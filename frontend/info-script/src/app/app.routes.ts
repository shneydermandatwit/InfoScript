import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UploadComponent } from './components/upload/upload.component';
import { authGuard } from './auth/auth.guard';
import { TranscriptsComponent } from './components/transcripts/transcripts.component';
import { TranscriptDetailComponent } from './components/transcript-detail/transcript-detail.component';

export const routes: Routes = [
    {
    path: '',
        component: HomeComponent,
        title: 'Home',
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
    },
    {
        path: 'register',
        component: RegisterComponent,
        title: 'Register'
    },
    {
        path: 'upload',
        component: UploadComponent,
        title: 'Upload',
        canActivate: [authGuard]
    },
    {
        path: 'transcripts',
        component: TranscriptsComponent,
        title: 'Transcripts',
        canActivate: [authGuard]
    },
    {
        path: 'transcripts/:id',
        component: TranscriptDetailComponent,
        title: 'Transcript Detail',
        canActivate: [authGuard]
    }
    
];

import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranscriptService } from '../../services/transcript/transcript.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';

@Component({
  selector: 'app-transcript-detail',
  standalone: true,
  imports: [CommonModule, TimeAgoPipe],
  template: `
  <section>
    <header>
    <button (click)="return()">Back to transcripts</button>
      <button class="delete-button" (click)="delete(transcript?._id)">
          delete
        </button>
        <h1 class="title">{{ transcript?.title }}</h1>
    </header>
    <body>
      <div class="transcript-body">
        <h3 class="filename">{{ transcript?.fileName }}</h3>
        <div class="transcript">
        <h3>Transcript:</h3>
        <p class="transcript-text">{{ transcript?.transcript }}</p>
        </div>
        <div class="summary" *ngIf="transcript?.summary">
        <h3>Summary:</h3>
        <p class="transcript-summary">
          {{ transcript?.summary }}
        </p>
        </div>
        <p class="timestamp">{{ transcript?.createdAt | timeAgo }}</p>
      </div>
    </body>
  </section>
  `,
  styleUrl: './transcript-detail.component.scss',
})
export class TranscriptDetailComponent implements OnInit {
  route = inject(ActivatedRoute);
  transcriptService = inject(TranscriptService);
  router = inject(Router);
  transcript: any;

  ngOnInit(): void {
    const transcriptId = this.route.snapshot.paramMap.get('id');
    console.log(transcriptId);
    this.transcriptService.getTranscriptById(transcriptId as string).subscribe({
      next: (response: any) => {
        console.log(response);
        this.transcript = response[0];
      },
      error: (error: any) => {
        console.log('transcriptdetail error', error);
      },
    });
  }

  delete(id: string) {
    this.transcriptService.deleteTranscriptById(id).subscribe({
      next: (response: any) => {
        console.log('successfully deleted', response);
        this.router.navigate(['/transcripts']);
      },
      error: (error: any) => {
        console.log('error deleting', error);
      },
      complete: () => {
        console.log('delete finished');
      },
    });
  }

  return(){
    this.router.navigate(['/transcripts']);
  }
}

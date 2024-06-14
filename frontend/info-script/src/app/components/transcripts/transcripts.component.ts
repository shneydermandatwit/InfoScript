import { Component, OnDestroy, inject } from '@angular/core';
import { TranscriptService } from '../../services/transcript/transcript.service';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Observable, Subject, takeUntil,of, from } from 'rxjs';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';

@Component({
  selector: 'app-transcripts',
  standalone: true,
  imports: [CommonModule, TimeAgoPipe],
  template: `
    <p>
      transcripts works!
      
    </p>
    <button (click)="getTranscripts()">Get</button>
    <ng-container *ngIf="transcripts$ | async as transcripts">
      <ul class="transcript-list">
        <li *ngFor="let transcript of transcripts" class="transcript-item">
          <h1>{{transcript.title}}</h1>
          <h3>{{transcript.fileName}}</h3>
          <p>Transcript:<br>{{transcript.transcript}}</p>
          <p *ngIf="transcript.summary">Summary:<br>{{transcript.summary}}</p>
          <p>{{transcript.createdAt | timeAgo }}</p>


          <hr>
        </li>
      </ul>
    </ng-container>
    <hr>
  `,
  styleUrl: './transcripts.component.scss'
})
export class TranscriptsComponent implements OnInit,OnDestroy {
  transcriptService = inject(TranscriptService);
  transcripts$ = this.transcriptService.transcripts$;
  destroy$ = new Subject<void>();


  ngOnInit():void {
    this.getTranscripts();
  }

  ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
  }

  getTranscripts(){
    this.transcriptService.getTranscripts().pipe(takeUntil(this.destroy$)).subscribe({
      next: (response: any)=>{
        this.transcriptService.updateTranscripts(response);
      },
      error: (error:any)=>{
        console.log("error getting transcripts: ", error)
      },
      complete: ()=>{
        console.log("got transcripts")
      }
    })
  }

}

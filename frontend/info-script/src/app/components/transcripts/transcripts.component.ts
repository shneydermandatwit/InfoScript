import { Component, OnDestroy, inject } from '@angular/core';
import { TranscriptService } from '../../services/transcript/transcript.service';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Observable, Subject, takeUntil,of, from } from 'rxjs';

@Component({
  selector: 'app-transcripts',
  standalone: true,
  imports: [CommonModule],
  template: `
    <p>
      transcripts works!
      
    </p>
    <button (click)="getTranscripts()">Get</button>
    <ng-container *ngIf="transcripts$ | async as transcripts">
      {{transcripts | json}}
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

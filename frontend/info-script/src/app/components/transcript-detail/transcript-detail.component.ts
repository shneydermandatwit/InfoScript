import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranscriptService } from '../../services/transcript/transcript.service';

@Component({
  selector: 'app-transcript-detail',
  standalone: true,
  imports: [],
  template: `
    <p>
      transcript-detail works!
    </p>
    {{transcript}}
  `,
  styleUrl: './transcript-detail.component.scss'
})
export class TranscriptDetailComponent implements OnInit{
  route = inject(ActivatedRoute);
  transcriptService = inject(TranscriptService);

  transcript:any;

  ngOnInit(): void {
      const transcriptId = this.route.snapshot.paramMap.get('id');
      this.transcriptService.getTranscriptById(transcriptId as string).subscribe({
        next: (response:any)=>{
          console.log(response)
          this.transcript = JSON.stringify(response);
        },
        error: (error:any)=>{
          console.log("transcriptdetail error",error)
        }
      })
  }



}

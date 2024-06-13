import { Component, inject } from '@angular/core';
import { TranscriptService } from '../../services/transcript/transcript.service';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div>
      File name:
      {{ transcriptService.fileName }}
    </div>
    <div>
      Transcript:
      {{ transcriptService.transcript }}
    </div>
    <div>
      @if(transcriptService.summary){ Summary:
      {{ transcriptService.summary }}
      }
    </div>
    <div>
      <form [formGroup]="saveForm" (submit)="save()">
        <label for="title">
          Title
        </label>
        <input id="title" type="text" formControlName="title">
        <button type="submit" [disabled]="!saveForm.value.title">
          Save
        </button>
        
      </form>
    </div>
  `,
  styleUrl: './save-form.component.scss',
})
export class SaveFormComponent {
  transcriptService = inject(TranscriptService);
  router = inject(Router);

  saveForm = new FormGroup({
    title: new FormControl(''),
  });

save(){
  this.transcriptService.save(this.saveForm.value.title as string).subscribe({
    next:(response:any)=>{
      console.log(response)
      this.router.navigate(['/transcripts'])
    },
    error:(error)=>{
      console.log(error)
    },
    complete:()=>{
      console.log("done")
    }
  })
  
}


}

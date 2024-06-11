import { Component, inject } from '@angular/core';
import { SaveService } from '../../services/save/save.service';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div>
      File name:
      {{ saveService.fileName }}
    </div>
    <div>
      Transcript:
      {{ saveService.transcript }}
    </div>
    <div>
      @if(saveService.summary){ Summary:
      {{ saveService.summary }}
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
  saveService = inject(SaveService);
  router = inject(Router);

  saveForm = new FormGroup({
    title: new FormControl(''),
  });

save(){
  this.saveService.save(this.saveForm.value.title as string).subscribe({
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

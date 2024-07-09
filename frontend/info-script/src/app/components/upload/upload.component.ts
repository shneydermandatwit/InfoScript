import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import { UploadService } from '../../services/upload/upload.service';
import { CommonModule } from '@angular/common';
import { TranscriptService } from '../../services/transcript/transcript.service';
import { SaveFormComponent } from '../save-form/save-form.component';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, SaveFormComponent],
  template: `
  <section>
  <div class="upload">
  <form [formGroup]="uploadForm" (ngSubmit)="uploadFile()" id="uploadForm">
      <input type="file" (change)="onFileSelected($event)" accept="audio/*" #fileElement/>
      <div class="checkbox-div">
      <label for="summarize">Summarize?</label>
      <input id="summarize" type="checkbox" formControlName="summarize" />
      </div>
      <button type="submit" [disabled]="!uploadForm.value.file">Transcribe</button>
      <button (click)="clearForm()">Clear</button>
    </form>
    <app-save-form *ngIf="this.transcriptService.transcript"></app-save-form>
</div>
</section>
  `,
  styleUrl: './upload.component.scss',
})
export class UploadComponent {
  uploadService = inject(UploadService);
  transcriptService = inject(TranscriptService);

  @ViewChild('fileElement') fileElement : ElementRef | undefined;

  uploadForm = new FormGroup({
    file: new FormControl(),
    summarize: new FormControl(false),
  });

  clearForm(){
    this.uploadForm.reset();
    if(this.fileElement){
      this.fileElement.nativeElement.value = '';
    }
  }




  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadForm.patchValue({ file: file });
  }

  uploadFile() {
    if (this.uploadForm.value.file) {
      this.uploadService
        .upload(this.uploadForm.value.file, !!this.uploadForm.value.summarize)
        
    }
  }
}

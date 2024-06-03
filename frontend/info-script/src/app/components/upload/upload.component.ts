import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  template: `
  <div id="upload-container">
  <form [formGroup]="uploadForm" (ngSubmit)="uploadFile()" id="uploadForm">
      <input type="file" (change)="onFileSelected($event)" accept="audio/*" />
      <div class="checkbox-div">
      <label for="summarize">Summarize?</label>
      <input id="summarize" type="checkbox" formControlName="summarize" />
      </div>
      
      <button type="submit">Submit</button>
    </form>
    <article *ngIf="this.responseSummary" class="response" id="summary">
    Summary: <br>
      {{ this.responseSummary }}
    </article>

    <article *ngIf="this.responseTranscript" class="response" id="transcript">
      Transcript: <br>
      {{ this.responseTranscript }}
    </article>
  </div>
    
  `,
  styleUrl: './upload.component.scss',
})
export class UploadComponent {
  uploadForm = new FormGroup({
    file: new FormControl(),
    summarize: new FormControl(false),
  });

  uploadService = inject(UploadService);

  responseTranscript: string = "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss";
  responseSummary: string = "sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss";

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadForm.patchValue({ file: file });
  }

  uploadFile() {
    if (this.uploadForm.value.file) {
      this.uploadService
        .upload(this.uploadForm.value.file, !!this.uploadForm.value.summarize)
        .subscribe({
          next: (response: any) => {
            console.log('upload succesful', response);
            this.responseSummary = response.results?.summary.short;
            this.responseTranscript = response.results.channels[0].alternatives[0].transcript;
          },
          error: (error) => {
            console.log('error:', error);
          },
          complete: () => {
            console.log('completed upload');
          },
        });
    }
  }
}

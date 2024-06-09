import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import { UploadService } from '../../services/upload/upload.service';
import { CommonModule } from '@angular/common';
import { SaveComponent } from '../save/save.component';
import { SaveService } from '../../services/save/save.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, SaveComponent],
  template: `
  <div id="upload-container">
  <form [formGroup]="uploadForm" (ngSubmit)="uploadFile()" id="uploadForm">
      <input type="file" (change)="onFileSelected($event)" accept="audio/*" #fileElement/>
      <div class="checkbox-div">
      <label for="summarize">Summarize?</label>
      <input id="summarize" type="checkbox" formControlName="summarize" />
      </div>
      <button type="submit" [disabled]="!uploadForm.value.file">Transcribe</button>
      <button (click)="clearForm()">Clear</button>
    </form>
    <article *ngIf="this.responseTranscript" class="response" id="transcript">
      Transcript: <br>
      {{ this.responseTranscript }}
    </article>
    <article *ngIf="this.responseSummary" class="response" id="summary">
    Summary: <br>
      {{ this.responseSummary }}
    </article>
  </div>
  <app-save *ngIf="responseTranscript"></app-save>
  `,
  styleUrl: './upload.component.scss',
})
export class UploadComponent {
  uploadService = inject(UploadService);
  saveService = inject(SaveService);

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


  responseTranscript: string = "";
  responseSummary: string = "";

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
            if(this.uploadForm.value.summarize){
              this.responseSummary = response.results?.summary.short;
              this.saveService.newSummary= this.responseSummary;

            }
            this.responseTranscript = response.results.channels[0].alternatives[0].transcript;
            this.saveService.newTranscript = this.responseTranscript;
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

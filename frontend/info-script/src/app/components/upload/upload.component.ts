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
    <div class="loadingWrapper" *ngIf="!this.loading">
    <img class="loadingIcon" src="Untitled_Artwork.gif">

    </div>
</div>
</section>
  `,
  styleUrl: './upload.component.scss',
})
export class UploadComponent{
  uploadService = inject(UploadService);
  transcriptService = inject(TranscriptService);

  @ViewChild('fileElement') fileElement : ElementRef | undefined;

  loading:boolean = false;

  toggleLoading(){
    this.loading = !this.loading;
  }

  uploadForm = new FormGroup({
    file: new FormControl(),
    summarize: new FormControl(false),
  });

  clearForm(){
    this.uploadForm.reset();
    if(this.fileElement){
      this.fileElement.nativeElement.value = '';
    }
    this.transcriptService.clearForm();
  }




  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadForm.patchValue({ file: file });
  }

  uploadFile() {
    if (this.uploadForm.value.file) {
      this.toggleLoading();
      this.uploadService
        .upload(this.uploadForm.value.file, !!this.uploadForm.value.summarize).subscribe({
          next: (response: any) => {
            this.toggleLoading();
            if(this.uploadForm.value.summarize){
              this.transcriptService.summary = response.results.summary.short;
            }
              this.transcriptService.transcript = response.results.channels[0].alternatives[0].transcript;
              this.transcriptService.fileName = this.uploadForm.value.file.name;
              console.log(response);
          },
          error: (error) => {
            console.log('error:', error);
          },
          complete: () => {
            console.log('completed upload');
          }
        });
        
    }
  }
}

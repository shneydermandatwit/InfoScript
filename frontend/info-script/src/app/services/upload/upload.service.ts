import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TranscriptService } from '../transcript/transcript.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {



  httpClient = inject(HttpClient);
  transcriptService = inject(TranscriptService);

  upload(file:File, summarize:boolean){


    const headers = new HttpHeaders({
      'Authorization': 'Token 81cf53225574ecd4604c85e920032c575179e0fe',
      'Content-Type' : `audio/mp3`,
      'Accept' : 'application/json'
    })
    console.log(file.type,file, typeof file)

    const url = `https://api.deepgram.com/v1/listen?summarize=${summarize?'v2':'false'}&smart_format=true&language=en&model=nova-2`;

    this.httpClient.post(url,file,{headers}).subscribe({
      next: (response: any) => {
        if(summarize){
          this.transcriptService.summary = response.results.summary.short;
        }
          this.transcriptService.transcript = response.results.channels[0].alternatives[0].transcript;
          this.transcriptService.fileName = file.name;
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

  constructor() {
   }
}

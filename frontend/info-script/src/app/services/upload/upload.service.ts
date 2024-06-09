import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {



  httpClient = inject(HttpClient);

  upload(file:File, summarize:boolean){


    const headers = new HttpHeaders({
      'Authorization': 'Token 81cf53225574ecd4604c85e920032c575179e0fe',
      'Content-Type' : `audio/mp3`,
      'Accept' : 'application/json'
    })
    console.log(file.type,file, typeof file)

    const url = `https://api.deepgram.com/v1/listen?summarize=${summarize?'v2':'false'}&smart_format=true&language=en&model=nova-2`;

    return this.httpClient.post(url,file,{headers})
  }

  constructor() {
   }
}

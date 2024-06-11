import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ROOT } from '../../baseUrl';

@Injectable({
  providedIn: 'root',
})
export class SaveService {
  httpClient = inject(HttpClient);
  url = `${ROOT}/transcripts/save`;

  //title: string = '';
  fileName: string = '';
  transcript: string = '';
  summary: string = '';

  save(title:string) {
    return this.httpClient.post(this.url, {
      title: title,
      fileName: this.fileName,
      transcript: this.transcript,
      summary: this.summary,
    });
  }

  constructor() {}
}

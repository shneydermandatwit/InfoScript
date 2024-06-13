import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ROOT } from '../../baseUrl';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranscriptService {
  httpClient = inject(HttpClient);
  saveUrl = `${ROOT}/transcripts/save`;
  getUrl = `${ROOT}/transcripts`

  private transcriptsSubject = new BehaviorSubject<any>(null);
  transcripts$ = this.transcriptsSubject.asObservable();

  fileName: string = '';
  transcript: string = '';
  summary: string = '';

  save(title:string) {
    return this.httpClient.post(this.saveUrl, {
      title: title,
      fileName: this.fileName,
      transcript: this.transcript,
      summary: this.summary,
    });
  }

  getTranscripts(): Observable<any>{
    return this.httpClient.get(this.getUrl)
  }

  updateTranscripts(response:any):void{
    this.transcriptsSubject.next(response)
  }

  constructor() {}
}

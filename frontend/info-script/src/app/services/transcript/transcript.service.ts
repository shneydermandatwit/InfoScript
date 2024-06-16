import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ROOT } from '../../baseUrl';
import { BehaviorSubject, Observable,map } from 'rxjs';
import { Transcript } from '../../models/transcript';

@Injectable({
  providedIn: 'root',
})
export class TranscriptService {
  httpClient = inject(HttpClient);
  saveUrl = `${ROOT}/transcripts/save`;
  getUrl = `${ROOT}/transcripts`

  private transcriptsSubject = new BehaviorSubject<Transcript[]>([]);
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

  getTranscriptById(id: string): Observable<Transcript | undefined> {
    return this.transcripts$.pipe(
      map(transcripts => transcripts.find(transcript => transcript._id === id))
    );
  }

  constructor() {}
}
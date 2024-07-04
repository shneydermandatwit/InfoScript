import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ROOT } from '../../baseUrl';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Transcript } from '../../models/transcript';
import { Filters } from '../../models/filters';
import { TranscriptFilterService } from '../transcriptFilter/transcript-filter.service';

@Injectable({
  providedIn: 'root',
})
export class TranscriptService {
  httpClient = inject(HttpClient);
  transcriptFilterService = inject(TranscriptFilterService)
  saveUrl = `${ROOT}/transcripts/save`;
  getUrl = `${ROOT}/transcripts`;
  deleteUrl = `${ROOT}/transcripts/`;

  private transcriptsSubject = new BehaviorSubject<Transcript[]>([]);
  transcripts$ = this.transcriptsSubject.asObservable();

  fileName: string = '';
  transcript: string = '';
  summary: string = '';

  save(title: string) {
    return this.httpClient.post(this.saveUrl, {
      title: title,
      fileName: this.fileName,
      transcript: this.transcript,
      summary: this.summary,
    });
  }

  getTranscripts(): Observable<any> {
    return this.httpClient.get(this.getUrl);
  }

  updateTranscripts(response: any): void {
    this.transcriptsSubject.next(response);
  }

  getTranscriptById(id: string): Observable<any> {
    return this.httpClient.get(`${this.getUrl}/${id}`);
  }

  deleteTranscriptById(id: string) {
    return this.httpClient.delete(`${this.deleteUrl}${id}`);
  }

  handleFilters(filters:Filters){
    return this.transcriptFilterService.handleFilters(this.transcripts$,filters);
  }
}

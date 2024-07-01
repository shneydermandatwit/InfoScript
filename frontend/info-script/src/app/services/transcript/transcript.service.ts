import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ROOT } from '../../baseUrl';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Transcript } from '../../models/transcript';
import { Filters } from '../../models/filters';

@Injectable({
  providedIn: 'root',
})
export class TranscriptService {
  httpClient = inject(HttpClient);
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

  handleFilters(filters: Filters) {
    return this.transcripts$.pipe(
      map((transcripts) => {
        let filteredTranscripts = transcripts;
        filteredTranscripts = this.applySearch(
          filters.searchTerm,
          filteredTranscripts
        );
        filteredTranscripts = this.applySummaryFilter(
          filters.summaryFilter,
          filteredTranscripts
        );
        filteredTranscripts = this.applyOrderBy(
          filters.orderBy,
          filters.orderDirection,
          filteredTranscripts
        );
        filteredTranscripts = this.applyDateFilters(
          filters.fromDate,
          filters.toDate,
          filteredTranscripts
        )
        
        

        return filteredTranscripts;
      })
    );
  }

  private applySummaryFilter(summaryFilter: string | null, transcripts: Transcript[]):Transcript[] {
    if(!summaryFilter){
      return transcripts;
    }
    const filteredTranscripts = transcripts.filter((transcript)=>{
      if(summaryFilter === "hasSummary" && transcript.summary){
        return true;
      }
      if(summaryFilter === "noSummary" && !transcript.summary){
        return true;
      }
      return false;
    })
    return filteredTranscripts;
  }

  private applySearch(term: string | null, transcripts: Transcript[]): Transcript[] {
    if (!term) {
      return transcripts;
    }
    const filteredTranscripts = transcripts.filter((transcript) => {
      const isMatch =
        transcript.title
          .toLowerCase()
          .trim()
          .includes(term.toLowerCase().trim()) ||
        transcript.fileName
          .toLowerCase()
          .trim()
          .includes(term.toLowerCase().trim()) ||
        transcript.transcript
          .toLowerCase()
          .trim()
          .includes(term.toLowerCase().trim()) ||
        transcript.summary
          ?.toLowerCase()
          .trim()
          .includes(term.toLowerCase().trim());
      return isMatch;
    });
    return filteredTranscripts;
  }

  private applyOrderBy(term: string | null, order:string | null,transcripts: Transcript[]){
    let filteredTranscripts = transcripts;
    if(term === "" && order === "desc"){//date desc
      filteredTranscripts.sort((a:Transcript,b: Transcript)=>{
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      })
    }else if(term === "" && order === "asc"){//date asc
      filteredTranscripts.sort((a:Transcript,b: Transcript)=>{
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
    }else if(term === "alphabetical" && order === "desc"){//alphabetical desc
      filteredTranscripts.sort((a:Transcript, b:Transcript)=>{
       return a.title.localeCompare(b.title)
      })
    }else if(term === "alphabetical" && order === "desc"){//aphabetical asc
      filteredTranscripts.sort((a:Transcript, b:Transcript)=>{
        return b.title.localeCompare(a.title)
      })
    }else if(term === "length" && order === "desc"){//length desc
      filteredTranscripts.sort((a:Transcript, b:Transcript)=>{
        return b.transcript.length - a.transcript.length;
      })
    }else{// length asc
      filteredTranscripts.sort((a:Transcript, b:Transcript)=>{
        return a.transcript.length - b.transcript.length;
      })
    }
    return filteredTranscripts;
  }

  private applyDateFilters(from:string|null, to: string|null, transcripts:Transcript[]){
    const filteredTranscripts = transcripts.filter((transcript)=>{
      const createdDate:number  = new Date(transcript.createdAt).getTime()
      let fromDate : number;
      let toDate : number;

      if(from){
        fromDate = new Date(from).getTime()
      }
      if(to){
        toDate = new Date(to).getTime()
      }

      if(from && to){
        return (createdDate>fromDate! && createdDate<toDate!)
      }
      if(from){
        return (createdDate>fromDate!)
      }
      if(to){
        return (createdDate<fromDate!)
      }
      return true;
    })
    return filteredTranscripts;
  }
}

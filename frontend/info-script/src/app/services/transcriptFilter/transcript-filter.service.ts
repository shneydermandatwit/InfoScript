import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Filters } from '../../models/filters';
import { Transcript } from '../../models/transcript';

@Injectable({
  providedIn: 'root'
})
export class TranscriptFilterService {

  constructor() { }

  handleFilters(transcripts$: Observable<Transcript[]>,filters: Filters) {
    return transcripts$.pipe(
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

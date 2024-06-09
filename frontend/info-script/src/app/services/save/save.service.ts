import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaveService {
  newTranscript: string | undefined;
  newSummary: string | undefined;

  constructor() { }
}

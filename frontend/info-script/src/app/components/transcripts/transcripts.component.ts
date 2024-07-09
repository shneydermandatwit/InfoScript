import { Component, OnDestroy, inject } from '@angular/core';
import { TranscriptService } from '../../services/transcript/transcript.service';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Observable, Subject, takeUntil} from 'rxjs';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';
import { Router } from '@angular/router';
import { Transcript } from '../../models/transcript';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Filters } from '../../models/filters';

@Component({
  selector: 'app-transcripts',
  standalone: true,
  imports: [CommonModule, TimeAgoPipe, ReactiveFormsModule],
  template: `
  <section>
    <div class="filters">
      <div id="searchGroup">
        <label for="searchBox">Search</label>
        <input
          type="text"
          [formControl]="searchControl"
          placeholder="Search"
          id="searchBox"
        />
      </div>

      <div id="summaryFilterGroup">
        <label for="summaryFilter">Summary Filter</label>
        <select [formControl]="summaryFilterControl" id="summaryFilter">
          <option value="">Show All</option>
          <option value="hasSummary">Summary</option>
          <option value="noSummary">No Summary</option>
        </select>
      </div>

      <div id="dateFilterGroup">
        <label for="fromDate">From Date</label>
        <input id="fromDate" type="datetime-local" [formControl]="fromDateFilter">
        <label for="toDate">To Date</label>
        <input id="toDate" type="datetime-local" [formControl]="toDateFilter">
      </div>

      <div id="orderByGroup">
        <label for="orderBy">Order By</label>
        <select [formControl]="orderByControl" id="orderBy">
          <option value="">Date Created</option>
          <option value="alphabetical">Alphabetically</option>
          <option value="length">Transcript Length</option>
        </select>
        <button id="sortDirection" (click)="toggleSortDirection()">
          {{ sortArrow }}
        </button>
      </div>
    </div>

  
    <div id="transcriptsSection"><ng-container *ngIf="filteredTranscripts$ | async as transcripts">
      <ul class="transcript-list">
        <li *ngFor="let transcript of transcripts" class="transcript-item">
          <div class="transcript-info">
          <h1>{{transcript.title}}</h1>
   <!--       <h3>{{transcript.fileName}}</h3> -->
   <!--       <h2>Transcript text:</h2> -->
          <p class="preview">{{transcript.transcript}}</p>
    <!--      <h2 *ngIf="transcript.summary">Summary text:</h2> -->
     <!--     <p *ngIf="transcript.summary" class="preview">{{transcript.summary}}</p> -->
          <div class="time">
          <p>{{transcript.createdAt | timeAgo }} - {{transcript.createdAt | date}}</p>
          </div>
          <div class="transcript-buttons">
          <button (click)="getDetail(transcript._id)">Details</button>
          <button (click)="delete(transcript._id)">Delete</button>
          </div>
          </div>
        </li>
      </ul>
    </ng-container></div>
</section>
    
  `,
  styleUrl: './transcripts.component.scss',
})
export class TranscriptsComponent implements OnInit, OnDestroy {
  transcriptService = inject(TranscriptService);
  router = inject(Router);
  destroy$ = new Subject<void>();
  transcripts$: Observable<Transcript[]> = this.transcriptService.transcripts$;
  filteredTranscripts$: Observable<Transcript[]> = this.transcripts$;

  searchControl: FormControl<string | null> = new FormControl('');
  summaryFilterControl: FormControl<string | null> = new FormControl('');
  fromDateFilter: FormControl<string | null> = new FormControl('');
  toDateFilter: FormControl<string | null> = new FormControl('');
  orderByControl: FormControl<string | null> = new FormControl('');
  orderDirectionControl: FormControl<string | null> = new FormControl('desc');

  sortArrow = '↓';

  ngOnInit(): void {
    this.getTranscripts();
    const controlChanges$ = [
      this.searchControl.valueChanges,
      this.summaryFilterControl.valueChanges,
      this.orderByControl.valueChanges,
      this.fromDateFilter.valueChanges,
      this.toDateFilter.valueChanges,
      this.orderDirectionControl.valueChanges,
    ];

    controlChanges$.forEach((controlChange) => {
      controlChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.applyFilters();
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getDetail(id: string) {
    this.router.navigate(['/transcripts', id]);
  }

  delete(id: string) {
    this.transcriptService.deleteTranscriptById(id).subscribe({
      next: (response: any) => {
        console.log('successfully deleted', response);
        this.getTranscripts();
      },
      error: (error: any) => {
        console.log('error deleting', error);
      },
      complete: () => {
        console.log('delete finished');
      },
    });
  }

  getTranscripts() {
    this.transcriptService
      .getTranscripts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: any) => {
          this.transcriptService.updateTranscripts(response);
        },
        error: (error: any) => {
          console.log('error getting transcripts: ', error);
        },
        complete: () => {
          console.log('got transcripts');
        },
      });
  }

  applyFilters() {
    const filters: Filters = {
      searchTerm: this.searchControl.value,
      summaryFilter: this.summaryFilterControl.value,
      orderBy: this.orderByControl.value,
      fromDate: this.fromDateFilter.value,
      toDate: this.toDateFilter.value,
      orderDirection: this.orderDirectionControl.value,
    };

    this.filteredTranscripts$ = this.transcriptService.handleFilters(filters);
  }

  toggleSortDirection() {
    if (this.sortArrow == '↓') {
      this.sortArrow = '↑';
      this.orderDirectionControl.setValue('asc');
    } else {
      this.sortArrow = '↓';
      this.orderDirectionControl.setValue('desc');
    }
  }
}

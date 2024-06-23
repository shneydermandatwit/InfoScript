import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranscriptDetailComponent } from './transcript-detail.component';

describe('TranscriptDetailComponent', () => {
  let component: TranscriptDetailComponent;
  let fixture: ComponentFixture<TranscriptDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranscriptDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TranscriptDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

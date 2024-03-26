import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertVectorsComponent } from './insert-vectors.component';

describe('InsertVectorsComponent', () => {
  let component: InsertVectorsComponent;
  let fixture: ComponentFixture<InsertVectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsertVectorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InsertVectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

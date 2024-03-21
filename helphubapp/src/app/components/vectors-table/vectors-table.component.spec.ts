import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorsTableComponent } from './vectors-table.component';

describe('VectorsTableComponent', () => {
  let component: VectorsTableComponent;
  let fixture: ComponentFixture<VectorsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VectorsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VectorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

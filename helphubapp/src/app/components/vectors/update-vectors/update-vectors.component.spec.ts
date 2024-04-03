import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVectorsComponent } from './update-vectors.component';

describe('UpdateVectorsComponent', () => {
  let component: UpdateVectorsComponent;
  let fixture: ComponentFixture<UpdateVectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateVectorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateVectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVectorsComponent } from './delete-vectors.component';

describe('DeleteVectorsComponent', () => {
  let component: DeleteVectorsComponent;
  let fixture: ComponentFixture<DeleteVectorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteVectorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteVectorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

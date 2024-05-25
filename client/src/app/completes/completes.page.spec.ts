import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompletesPage } from './completes.page';

describe('CompletesPage', () => {
  let component: CompletesPage;
  let fixture: ComponentFixture<CompletesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

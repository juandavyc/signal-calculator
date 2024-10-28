import { ComponentFixture, TestBed } from '@angular/core/testing';
import CalculatorViewComponent from './calculator-view.component';

describe('CalculatorViewComponent', () => {
  // compoente de articulos fijos
  let fixture: ComponentFixture<CalculatorViewComponent>;
  let compiled: HTMLElement;
  let component: CalculatorViewComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorViewComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CalculatorViewComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

  });

  it('should create the app', () => {
   // console.log(compiled);
    expect(component).toBeTruthy();
  });

  it('should contain calculator component', () => {
    // buscar ese elemento
    expect(compiled.querySelector('calculator')).not.toBeNull();
  })

  it('should contain basic css classes', () => {
    const divElement = compiled.querySelector('div');
    const divClases = divElement?.classList.value.split(' ');

    // creo un arreglo
    const shouldHave: string[] = 'w-full mx-auto rounded-xl bg-gray-100 shadow-xl text-gray-800 relative overflow-hidden'.split(' ');

    shouldHave.forEach((className)=>{
      expect(divClases).toContain(className)
    })

  })

});

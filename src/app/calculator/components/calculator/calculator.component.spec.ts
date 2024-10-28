



import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '@/calculator/services/calculator.service';
import { inject } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CalculatorButtonComponent } from '../calculator-botton/calculator-botton.component';

// para no evalular el servicio
class MockCalculatorService {

  public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
  public subResultText = jasmine.createSpy('subResultText').and.returnValue('0');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');

  public constructNumber = jasmine.createSpy('constructNumber');
}



describe('CalculatorComponent', () => {
  // compoente de articulos fijos
  let fixture: ComponentFixture<CalculatorComponent>;
  let compiled: HTMLElement;
  let component: CalculatorComponent;

  let mockCalculatorService: MockCalculatorService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [{
        provide: CalculatorService, useClass: MockCalculatorService
      }],
    }).compileComponents();
    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
    mockCalculatorService = TestBed.inject(CalculatorService) as unknown as MockCalculatorService;
    //fixture.detectChanges();

  });

  it('should create the app', () => {
    //console.log(compiled);
    expect(component).toBeTruthy();
  });

  it('should have the ccurrent getters', () => {
    expect(component.resultText()).toBe('100.00');
    expect(component.subResultText()).toBe('0');
    expect(component.lastOperator()).toBe('+');
  });

  it('should display proper calculation values', () => {

    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('0');
    mockCalculatorService.lastOperator.and.returnValue('+');

    fixture.detectChanges();

    // console.log(compiled);

    expect(compiled.querySelector('span')?.innerText).toBe('123');
    expect(component.resultText()).toBe('123');
    expect(component.subResultText()).toBe('0');
    expect(component.lastOperator()).toBe('+');
  });

  it('should have 19 calculator-button components', () => {
    expect(component.calculatorButtons).toBeTruthy();
    expect(component.calculatorButtons().length).toBe(19);

  })
  it('should have 19 calculator-button components with projected content', () => {

    // const buttonsByDirective = fixture.debugElement.queryAll(
    //   By.directive(CalculatorButtonComponent)
    // );
    // console.log('n: ',buttonsByDirective)

    const buttons = compiled.querySelectorAll('calculator-button');
    expect(buttons.length).toBe(19);

    expect(buttons[0].textContent?.trim()).toBe('C');
    expect(buttons[1].textContent?.trim()).toBe('+/-');
    expect(buttons[2].textContent?.trim()).toBe('%');
    expect(buttons[3].textContent?.trim()).toBe('÷');
  })


  it('should handle key event correctly', () => {

    const eventEnter = new KeyboardEvent('keyup', { key: 'Enter' });
    document.dispatchEvent(eventEnter);
    // debe ser llamado con un
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=');
    const eventEscape = new KeyboardEvent('keyup', { key: 'Escape' });
    document.dispatchEvent(eventEscape);
    // debe ser llamado con un
    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C')
  })

  it('should display result text correctly', () => {
    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('10');
    mockCalculatorService.lastOperator.and.returnValue('-');

    fixture.detectChanges();

    expect(component.resultText()).toBe('123');
    // tobe, para ser exacto.
    // to contain, si tiene, ignore espacios etcs
    expect(compiled.querySelector('#sub-result')?.textContent).toContain('10 -')

   // expect(component.resultText()).toBe('123');

  })
});

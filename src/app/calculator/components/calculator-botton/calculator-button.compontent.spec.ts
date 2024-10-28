import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorButtonComponent } from './calculator-botton.component';
import { Component } from '@angular/core';



@Component({
  standalone: true,
  imports: [CalculatorButtonComponent],
  selector: 'test-host',
  template: `
  <calculator-button>
    <span class="projected-content underline">test content</span>
  </calculator-button>
  `,
})

class TestHostComponent {

}

describe('CalculatorButtonComponent', () => {
  // compoente de articulos fijos
  let fixture: ComponentFixture<CalculatorButtonComponent>;
  let compiled: HTMLElement;
  let component: CalculatorButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalculatorButtonComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CalculatorButtonComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;


    // detecte cambios

    fixture.detectChanges();

  });

  it('should create the app', () => {
    //console.log(compiled);
    expect(component).toBeTruthy();
  });

  it('should apply w-1/4 if doubleSize is false', () => {
    const hostCssClases: string[] = compiled.classList.value.split(' ');
    expect(hostCssClases).toContain('w-1/4');
    expect(component.isDoubleSize()).toBeFalse();
  });

  it('should apply w-2/4 if doubleSize is true', () => {
    // el igual, aca lo voy a forzar
    fixture.componentRef.setInput('isDoubleSize', true);
    fixture.detectChanges();
    const hostCssClases: string[] = compiled.classList.value.split(' ');
    expect(hostCssClases).toContain('w-2/4');
    expect(component.isDoubleSize()).toBeTrue();
  });

  it('should emit onClick when handleClick is called', () => {
    // espias
    spyOn(component.onClick, 'emit');

    component.handleClick();

    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it('should set isPressed to true and then false when keyboardPressStyle is called', (done) => {
    // cuando defino done, es si tengo algo async
    component.contentValue()!.nativeElement.innerText = '1';
    component.keyboardPressedStyle('1');

    expect(component.isPressed()).toBe(true);

    setTimeout(() => {
      expect(component.isPressed()).toBeFalse();
      done();
    }, 202);

  });

  it('should display projected content', () => {

    const testHostFixtured = TestBed.createComponent(TestHostComponent);
    // console.log('button: ',testHostFixtured.nativeElement);
    const compiled = testHostFixtured.nativeElement as HTMLDivElement;

    expect(compiled.querySelector('.projected-content')).not.toBeNull();
    expect(compiled.querySelector('.projected-content')?.classList.contains('underline')).toBeTrue()

  });

});

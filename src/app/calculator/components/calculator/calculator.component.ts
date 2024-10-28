import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorService } from '@/calculator/services/calculator.service';
import { CalculatorButtonComponent } from '../calculator-botton/calculator-botton.component';

@Component({
  selector: 'calculator',
  standalone: true,
  imports: [
    CalculatorButtonComponent
  ],

  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)'
  }
})
export class CalculatorComponent {


  private calculatorService = inject(CalculatorService);

  public calculatorButtons = viewChildren(CalculatorButtonComponent);


  // señales
  public resultText = computed(() => this.calculatorService.resultText())
  public subResultText = computed(() => this.calculatorService.subResultText())
  public lastOperator = computed(() => this.calculatorService.lastOperator())

  // recibe
  handleClick(key: string) {
    // console.log({ key })

    this.calculatorService.constructNumber(key)
  }

  // @HostListener('document:keyup',['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;

    const keyEquivalents: Record<string, string> = {
      Escape: 'C',
      Clear: 'C',
      X: '*',
      '/': '÷',
      Enter: '=',
    };

    const keyValue = keyEquivalents[key] ? keyEquivalents[key] : key;


    this.handleClick(keyValue)


    this.calculatorButtons().forEach((button) => {
      button.keyboardPressedStyle(keyValue)
    })

  }



}

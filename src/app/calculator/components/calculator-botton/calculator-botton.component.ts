import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, input, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './calculator-botton.component.html',
  styleUrl: './calculator-botton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'border-r border-b border-indigo-400', // 'w-1/4 border-r border-b border-indigo-400',
    '[class.w-2/4]': 'isDoubleSize()', // el igual
    '[class.w-1/4]': '!isDoubleSize()' // normales
    // 'data-size': 'xl'
  }
})
export class CalculatorButtonComponent {

  // public isCommand = input(
  //   false, // valor defecto
  //   {
  //     // convertirlo a un boolean
  //     transform:(value: boolean | string)=> typeof(value) === 'string' ? '' : value,
  //   }
  // );


  public isPressed = signal(false);

  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button'); // busca la referencia

  public isCommand = input<Boolean>(
    false
  )

  public isDoubleSize = input<Boolean>(
    false
  )
  // input().isRequired()

  // // acceso a todo
  // get doubleSizeStyle() {
  //   return this.isDoubleSize()
  // }


  handleClick() {
    if (!this.contentValue()?.nativeElement) {
      return;
    }
    const value = this.contentValue()!.nativeElement.innerText;
    this.onClick.emit(value.trim());
    console.log('calculator-button-handleClick: ',value)
  }

  public keyboardPressedStyle(key: string) {
    if (!this.contentValue()) return;
    const value = this.contentValue()!.nativeElement.innerText;
    if (value !== key) return;
    this.isPressed.set(true)
    setTimeout(() => {
      this.isPressed.set(false);
    }, 200)

  }



}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  // compoente de articulos fijos
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;
  });
  3
  // sencilla, si se logra montar y las dependencias correctas etc
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should be 3', () => {
    // a arrange
    const num1 = 2;
    const num2 = 1;
    // a act
    const result = num1 + num2;
    // a assert

    expect(result).toBe(3)

  })

  // it(`should have the 'zoneless-calculator' title`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('zoneless-calculator');
  // });

  it('should render router', () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });
  //
  it('should render router-outlet wrapped with css clasess', () => {
    const divElement = compiled.querySelector('div');
    const mustHaveClasses = 'min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5'.split(' ');
    // que contenga un div
    expect(divElement).not.toBeNull();
    // que todas las clases extraidas en la prueba
    // sean iguales a mustHaveClasses, sera solo esas
    // divElement?.classList.forEach(className =>{
    //   expect(mustHaveClasses).toContain(className)
    // })
    // que las clases contengan mustHaveclases y otras
    const divCssClases = divElement?.classList.value.split(' ');
    mustHaveClasses.forEach((cssClass) => {
      expect(divCssClases).toContain(cssClass)
    })
  })

  it('should contain the "buy me a beer" link ', () => {

    const mustHaveTitle = 'Buy me a beer';
    const mustHaveHref = 'https://www.buymeacoffee.com/scottwindon';

    const anchoElement = compiled.querySelector('a');
    //anchoElement?.title = ''
    // expect(anchoElement).not.toBeNull();

    // expect(anchoElement?.getAttribute('href')).toBe(mustHaveHref);
    // expect(anchoElement?.getAttribute('title')).toBe(mustHaveTitle);

    expect(anchoElement?.href).toBe(mustHaveHref);
    expect(anchoElement?.title).toBe(mustHaveTitle);
  })

});

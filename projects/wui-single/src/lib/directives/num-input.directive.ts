import { DecimalPipe } from '@angular/common';
import { Directive, ElementRef, computed, effect, inject, input, model } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[wuiNumInput]',
  standalone: true,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: NumInputDirective,
    multi: true
  }],
  host: {
    '(keydown)': 'handleKeyDown($event)',
    '(focusout)': 'handleFocusOut($event)',
    '[attr.inputmode]': '"decimal"'
  }
})
export class NumInputDirective implements ControlValueAccessor {
  private decimalPipe = inject(DecimalPipe);
  private elementRef = inject(ElementRef<HTMLInputElement>);

  // Input signals
  format = input('1.0-2');
  value = model<string | null>(null);

  // Computed signals
  isNegative = computed(() => this.value()?.includes('-') ?? false);
  isDecimal = computed(() => this.value()?.includes('.') ?? false);

  numberPart = computed(() => {
    const regex = this.isNegative() ? /-(.*)/ : /(.*)/;
    const match = this.value()?.match(regex);
    return this.parseNumber(match?.[1] ?? null);
  });

  decimalPart = computed(() => {
    if (!this.isDecimal()) return null;
    const match = this.value()?.match(/\.(.*)/);
    return match?.[1] ?? null;
  });

  numericValue = computed(() => {
    const numStr = [this.numberPart(), this.decimalPart()].filter(Boolean).join('.');
    const num = parseFloat(numStr);
    return this.isNegative() ? -num : num;
  });

  formattedValue = computed(() => {
    const prefix = this.isNegative() ? '-' : '';
    const number = this.numberPart() ? 
      this.decimalPipe.transform(this.numberPart(), this.format()) : '';
    const decimal = this.isDecimal() ? `.${this.decimalPart()}` : '';
    return `${prefix}${number}${decimal}`;
  });

  // Filter functions (unchanged from previous version)
  private allowNumbers(event: KeyboardEvent) { /* ... */ }
  private allowFunctional(event: KeyboardEvent) { /* ... */ }
  private allowDecimals(event: KeyboardEvent) { /* ... */ }
  private allowNegative(event: KeyboardEvent) { /* ... */ }

  constructor() {
    effect(() => {
      this.elementRef.nativeElement.value = this.formattedValue();
    });
  }

  handleKeyDown(event: KeyboardEvent) {
    const allowed = [
      this.allowNumbers(event),
      this.allowFunctional(event),
      this.allowDecimals(event),
      this.allowNegative(event)
    ].some(Boolean);

    if (!allowed) {
      event.preventDefault();
      return;
    }

    setTimeout(() => {
      this.value.set(this.elementRef.nativeElement.value);
    });
  }

  handleFocusOut() {
    this.value.set(this.elementRef.nativeElement.value);
  }

  private parseNumber(str: string | null) {
    if (!str) return null;
    const num = parseFloat(str.replace(/[^\d.]/g, ''));
    return isNaN(num) ? null : num;
  }

  // ControlValueAccessor implementation
  writeValue(obj: number | null): void {
    this.value.set(obj?.toString() ?? null);
  }

  registerOnChange(fn: (value: number | null) => void): void {
    effect(() => {
      fn(this.numericValue());
    });
  }

  registerOnTouched(fn: () => void): void {}
}
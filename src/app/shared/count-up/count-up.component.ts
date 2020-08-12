import {
  Component, Input, Output, EventEmitter, AfterViewInit, OnChanges,
  HostListener, ElementRef, SimpleChange
}
  from '@angular/core';

@Component({
  selector: 'app-count-up',
  templateUrl: './count-up.component.html',
  styleUrls: ['./count-up.component.css']
})
export class CountUpComponent implements AfterViewInit, OnChanges {
  visibleValue: number = 0;
  isRunning = false;
  isDone = false;
  private increment: number = 0;
  private lastInput: number = 0;

  @Input() value: number;
  @Input() speed: number = 1; // Rate at which element counts up
  @Input() refreshRate: number = 60; // Rate at which content is updated in Hz
  @Input() initialDelay: number = 0;
  @Input() autoStart: boolean = false;
  @Output() onFinished: EventEmitter<any> = new EventEmitter();

  constructor(private elRef: ElementRef) {}

  ngAfterViewInit(): void {
    // Sometimes elements do not settle at their final value on init, especially
    // if created by an Ngfor
    setTimeout(() => {this.tryAutoStart();}, 10);
  }

  ngOnChanges(changes: {[propertyName: string]: SimpleChange}): void {
    if ((changes['refreshRate'] || changes['value'] || changes['speed'])
      && this.refreshRate && this.value && this.speed)
      this.increment = Math.pow(this.value, 2) * this.refreshRate * this.speed /
        1000000;
  }

  ngDoCheck(): void {
    this.tryAutoStart();
  }

  isVisible(): boolean {
    const box = this.elRef.nativeElement.getBoundingClientRect();
    const elBottom = box.bottom;
    return elBottom < window.innerHeight && elBottom > 0;
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.tryAutoStart();
  }

  tryAutoStart(): void {
    if (!this.isDone && !this.isRunning && this.autoStart && this.isVisible())
      this.start();
  }

  public start(): void {
    if (!this.isRunning) {
      this.isRunning = true;
      setTimeout(() => {
        this.visibleValue = 0;
        this.countUp();
      }, this.initialDelay);
    } else throw `CountUp with value ${this.value} is already running`;
  }

  public startNow(): void {
    if (!this.isRunning) {
      this.visibleValue = 0;
      this.isRunning = true;
      this.countUp();
    } else throw `CountUp with value ${this.value} is already running`;
  }

  public stop(): void {
    if (this.isRunning) this.isRunning = false;
    else throw `CountUp with value ${this.value} is already stopped`;
  }

  public reset(): void {
    this.stop();
    this.visibleValue = 0;
    this.isDone = false;
  }

  countUp(): void {
    if (this.visibleValue !== this.value) {
      setTimeout(() => {
        const valueIncrement = Math.ceil(Math.sqrt(this.lastInput));
        this.lastInput += this.increment
        if (this.visibleValue + valueIncrement > this.value)
          this.visibleValue = this.value;
        else this.visibleValue += valueIncrement;
        this.countUp();
      }, 1000 / this.refreshRate)
    } else {
      this.isRunning = false;
      this.isDone = true;
      if (this.onFinished)
        this.onFinished.emit();
    }
  }

}

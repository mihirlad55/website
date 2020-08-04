import {
  Component, OnInit, AfterViewInit, Input, Output, EventEmitter, ElementRef,
  HostListener
} from '@angular/core';

@Component({
  selector: 'app-typewriter',
  templateUrl: './typewriter.component.html',
  styleUrls: ['./typewriter.component.css']
})
export class TypewriterComponent implements OnInit, AfterViewInit {
  type_stack = [];
  content = "";
  isRunning = false;
  isDone = false;
  showCursor = false;
  initialTop = 0;

  @Input() to_write = "";
  @Input() initialDelay = 0;
  @Input() delay = 100;
  @Input() autostart = false;
  @Output() onFinished: EventEmitter<any> = new EventEmitter();

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initialTop = this.elRef.nativeElement.getBoundingClientRect().top;
    if (this.autostart)
      this.onWindowScroll(null);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event) {
    if (!this.isDone && !this.isRunning && this.autostart &&
      window.scrollY + window.innerHeight * 0.9 > this.initialTop)
      this.start();
  }

  public start(): void {
    if (!this.isRunning) {
      this.isRunning = true;
      setTimeout(() => {
        this.showCursor = true;
        let new_stack = this.to_write.split('').reverse();
        this.type_stack = [...new_stack];
        this.typewrite();
      }, this.initialDelay);
    } else
      throw `Typewriter with content ${this.to_write}is already running`;
  }

  public startNow(): void {
    if (!this.isRunning) {
      let new_stack = this.to_write.split('').reverse();
      this.showCursor = true;
      this.type_stack = [...new_stack];
      this.isRunning = true;
      this.typewrite();
    } else
      throw `Typewriter with content ${this.to_write}is already running`;
  }

  public stop(): void {
    if (this.isRunning) {
      this.type_stack = [];
      this.isRunning = false;
    } else
      throw `Typewriter with content ${this.to_write}is already stopped`;
  }

  public reset(): void {
    this.stop();
    this.content = "";
    this.showCursor = false;
    this.isDone = false;
  }

  typewrite(): void {
    if (this.type_stack.length > 0) {
      setTimeout(() => {
        this.content += this.type_stack.pop();
        this.typewrite();
      }, this.delay)
    } else {
      if (this.onFinished)
        this.onFinished.emit();
      this.isRunning = false;
      this.isDone = true;
      this.showCursor = false;
    }
  }

}

import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-typewriter',
  templateUrl: './typewriter.component.html',
  styleUrls: ['./typewriter.component.css']
})
export class TypewriterComponent implements OnInit {
  type_stack = [];
  content = "";
  running = false;
  showCursor = false;

  @Input() to_write = "";
  @Input() delay = 0;
  @Output() onFinished: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
  }

  public start(): void {
    setTimeout(() => {
      this.startNow();
    }, this.delay);
  }

  public startNow(): void {
    if (!this.running) {
      let new_stack = this.to_write.split('').reverse();
      this.showCursor = true;
      this.type_stack = [...new_stack];
      this.running = true;
      this.typewrite();
    } else
      throw `Typewriter with content ${this.to_write}is already running`;
  }

  public stop(): void {
    if (this.running) {
      this.type_stack = [];
      this.running = false;
    } else
      throw `Typewriter with content ${this.to_write}is already stopped`;
  }

  public reset(): void {
    this.stop();
    this.content = "";
  }

  typewrite(): void {
    if (this.type_stack.length > 0) {
      setTimeout(() => {
        this.content += this.type_stack.pop();
        this.typewrite();
      }, 100)
    } else {
      if (this.onFinished)
        this.onFinished.emit();
      this.running = false;
    }
  }

}

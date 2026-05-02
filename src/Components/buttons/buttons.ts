import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-buttons',
  imports: [],
  templateUrl: './buttons.html',
  styleUrl: './buttons.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Buttons {
  @Input() title: string = 'Button';
  @Input() color: string = 'linear-gradient(135deg, #fde68a, #f59e0b)';
  @Input() width: string = '100%';
  @Input() height: string = '44px';
  @Input() disabled: boolean = false;
  @Output() action = new EventEmitter<MouseEvent>();
}

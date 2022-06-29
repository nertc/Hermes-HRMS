import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'hermes-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackgroundComponent implements OnChanges {
  @Input() rectangles = 0;
  public boxes: any[] = [];

  ngOnChanges(): void {
    this.boxes = new Array(this.rectangles).fill(undefined).map(() => {
      const left = Math.floor(Math.random() * 100) + '%';
      const size = Math.floor(15 + Math.random() * 135) + 'px';
      const delay = Math.floor(Math.random() * 15) + 's';
      const duration = Math.floor(15 + Math.random() * 35) + 's';

      return {
        left,
        width: size,
        height: size,
        delay,
        duration,
      };
    });
    console.log(this.boxes);
  }
}

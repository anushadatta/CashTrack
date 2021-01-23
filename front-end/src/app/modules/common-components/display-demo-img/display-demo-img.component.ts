import { Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { demoUserBlurImgPath } from 'src/app/common/variable';

@Component({
  selector: 'app-display-demo-img',
  templateUrl: './display-demo-img.component.html',
  styleUrls: ['./display-demo-img.component.css']
})
export class DisplayDemoImgComponent {
  @Input() imgSrc: string;
  imgPath = environment.endPoint + demoUserBlurImgPath;
  // @Input() displayImg: boolean;
}

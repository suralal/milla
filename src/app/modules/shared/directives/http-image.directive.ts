import {
  Directive,
  Input,
  ElementRef,
  HostListener,
  OnChanges
} from '@angular/core';
import { LoadImageService } from '../services/load-image.service';

@Directive({
  selector: '[millaHttpImage]'
})
export class HttpImageDirective implements OnChanges {
  @Input() url;

  constructor(
    private element: ElementRef,
    private loadImageService: LoadImageService
  ) {}
  ngOnChanges() {
    if (this.url) {
      if (
        this.url === '/assets/images/logo_picture_placeholder.png' ||
        this.url.includes('googleusercontent')
      ) {
        this.element.nativeElement.src = this.url;
      } else {
        // get a service for image req
        // pass the res data here
        this.loadImageService.loadImage(this.url).subscribe(data => {
          const urlCreator = window.URL;
          const imageUrl = urlCreator.createObjectURL(data);
          this.element.nativeElement.src = imageUrl;
        });
      }
    }
  }
}

import { Observable, of } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, OnInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService implements OnInit {

  imageSize!: string;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {

  }

  getImageSize(): Observable<string> {
    if(!this.imageSize) {
      return this.breakpointObserver.observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
      ]).pipe(
        tap(result => {
          if (result.breakpoints[Breakpoints.XSmall] || result.breakpoints[Breakpoints.Small]) {
            this.imageSize = 'small';
          }
          if (result.breakpoints[Breakpoints.Medium] || result.breakpoints[Breakpoints.Large]) {
            this.imageSize = 'large';
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.imageSize = 'large';
          }
        }),
        map(() => this.imageSize)
      );
    } else {
      return of(this.imageSize)
    }
  }
}

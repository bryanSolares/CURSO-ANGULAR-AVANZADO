import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnInit, OnDestroy {
  public intervalSub: Subscription;

  constructor() {
    /*     this.retornaObservable().pipe(retry(2)).subscribe(
      (valor) => console.log('Sub:', valor),
      (error) => console.warn('Error:', error),
      () => console.log('Obs Terminado')
    ); */

    this.intervalSub = this.retornaInvervalo().subscribe(console.log);
  }
  ngOnDestroy(): void {
    this.intervalSub.unsubscribe();
  }

  ngOnInit(): void {}

  retornaInvervalo(): Observable<number> {
    return interval(500).pipe(
      map((valor) => valor + 1),
      filter((valor) => valor % 2 === 0),
      take(10)
    );
  }

  retornaObservable(): Observable<number> {
    let i = -1;
    return new Observable<number>((observer) => {
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intervalo);
          observer.complete();
        }

        if (i === 2) {
          i = 0;
          observer.error('i llego al valor de 2');
        }
      }, 1000);
    });
  }
}

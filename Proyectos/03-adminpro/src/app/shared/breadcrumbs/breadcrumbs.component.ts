import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Data, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  public title = '';
  public tituloSub$: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.tituloSub$ = this.getDataRuta().subscribe(({ title }) => {
      this.title = title;
      document.title = `AdminPro - ${title}`;
    });
  }
  ngOnDestroy(): void {
    this.tituloSub$.unsubscribe();
  }

  ngOnInit(): void {}

  getDataRuta(): Observable<Data> {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild == null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}
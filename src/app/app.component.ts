import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { of, from, fromEvent, firstValueFrom, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  //
  // example using of() and from() methods to create observables
  data: number = 0;
  constructor() {
    const numbers$ = of([1, 2, 3, 4, 5]); // of() returns an Observable
    const numbers2$ = from([1, 2, 3, 4, 5]); // from() returns an Observable as well

    numbers$.subscribe((data) => {
      console.log('subscriber (of)', data);
    });
    numbers2$.subscribe((data) => {
      console.log('subscriber (from)', data);
      this.data = data;
    });

    // converting JS data
    const users = [
      { id: 1, name: 'John', age: 30 },
      { id: 2, name: 'Jane', age: 35 },
      { id: 3, name: 'Mike', age: 25 },
    ];
    const messagePromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Promise resolved');
        // reject('Promise rejected');
      }, 1000);
    });

    const users$ = of(users);
    const message$ = from(messagePromise); // when working with promises, use from() method
    const bodyClick$ = fromEvent(document.body, 'click'); // when working with DOM events, use fromEvent() method

    // simulate of() method
    const users2$ = new Observable((observer) => {
      // observer.next(1);
      observer.next(users);
      observer.complete();
      observer.next(2);
    });

    // promise
    firstValueFrom(users$).then((users) => {
      console.log('users', users);
    });

    // observable
    users$.subscribe((users) => {
      console.log('users', users);
    });
    users2$.subscribe((users) => {
      console.log('users2', users);
    });

    // message$.subscribe((message) => {
    //   console.log('message', message);
    // });
    message$.subscribe({
      next: (message) => {
        console.log('message', message);
      },
      error: (error) => {
        console.error('error', error);
      },
      complete: () => {
        console.log('complete');
      },
    });

    bodyClick$.subscribe((event) => {
      console.log('event', event);
    });
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userIdSubject = new BehaviorSubject<string | null>(
    localStorage.getItem('userId')
  );
  userId$ = this.userIdSubject.asObservable();

  setUserId(userId: string | null) {
    if (userId) {
      localStorage.setItem('userId', userId);
    } else {
      localStorage.removeItem('userId');
    }
    this.userIdSubject.next(userId);
  }
  constructor() {}
}

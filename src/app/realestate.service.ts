import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Realestate } from './realestate';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RealestateService {
  private url: string = 'http://localhost:2004/';
  @Output() public realestateDataSubject: Subject<Realestate[]> = new Subject<
    Realestate[]
  >();
  constructor(private http: HttpClient) {}

  getRealEstates(): Observable<Realestate[]> {
    return this.http.get<Realestate[]>(this.url + 'realestate');
  }

  raiseRealestateData(data: Realestate[]) {
    this.realestateDataSubject.next(data);
  }

  getRealEstateSubject(): Observable<Realestate[]> {
    console.log(this.realestateDataSubject);
    return this.realestateDataSubject.asObservable();
  }
}

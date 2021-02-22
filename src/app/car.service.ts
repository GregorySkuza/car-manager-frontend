import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Car} from './car';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getCars(): Observable<any> {
    return this.http.get<any>(`${this.apiServerUrl}/car/all`);
  }
  public addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.apiServerUrl}/car/add`, car);
  }

  public updateCar(car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.apiServerUrl}/car/update`, car);
  }

  public deleteCar(carId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/car/delete/${carId}`);
  }

}

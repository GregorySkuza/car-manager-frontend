import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Car} from './car';
import {CarService} from './car.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public cars: Car[];
  public editCar: Car;
  public deleteCar: Car;

  constructor(private carService: CarService) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getCars();
  }

  public getCars(): void {
    this.carService.getCars().subscribe(
      (response: Car[]) => {
        this.cars = response;
        console.log(this.cars);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchCars(key: string): void {
    console.log(key);
    const results: Car[] = [];
    for (const car of this.cars) {
      if (car.brand.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || car.model.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || car.type.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || car.vinNumber.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(car);
      }
    }
  }

  public onOpenModal(car: Car, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCarModal');
    }
    if (mode === 'edit') {
      button.setAttribute('data-target', '#updateCarModal');
    }
    if (mode === 'delete') {
      button.setAttribute('data-target', '#deleteCarModal');
    }
    container.appendChild(button);
    button.click();
  }
}



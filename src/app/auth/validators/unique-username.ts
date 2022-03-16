import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';



@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {

  constructor(private http: HttpClient) {}

  validate = (control: AbstractControl ): any => {
      const {value} = control;

      console.log(this.http);

      return null;
  }

 

}

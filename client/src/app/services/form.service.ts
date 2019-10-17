import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  postForm(obj) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:5000/api/test/add', obj).subscribe(
        res => {
          console.log('res =', res);
          resolve(res);
        },
        err => {
          console.log('err =>', err);
          reject(err);
        }
      )
    });
  }
}

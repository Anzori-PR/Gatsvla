import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private modalState = new BehaviorSubject<boolean>(false);
  modal$ = this.modalState.asObservable();

  openModal(){
    this.modalState.next(true);
  }

  closeModal(){
    this.modalState.next(false);
  }

  login(data:any){
    console.log('Login:', data);
  }

  register(data:any){
    console.log('Register:', data);
  }

}
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../Models';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: undefined;

  constructor(private apiService: ApiService) { }

  public async checkAuth(email:string, password: string): Promise<boolean>{

    let users: User[] = [];

    try{

      let apiResponse =  this.apiService.getUserToAuth(email,password); // Recibo la respuesta de la api en forma de observable

      users = await lastValueFrom(apiResponse);// Transformo el observable en una promesa y espero a que se resuelva con el await. Lo que me devuelve es el User[] porque asi se puso en el apiService

    }catch(error){
      console.log(error);
    }

    return users.length == 1;
  }

  public async userRegister(user: User): Promise<boolean> {
    try {
      let apiResponse = this.apiService.addUser(user);
      await lastValueFrom(apiResponse);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public logout(){
    this.user = undefined;
    localStorage.clear();
  }


  /*
  Lo siguiente no funciona porque el susbcribe, al ser observable, se saltea y el length se hace en base a un arreglo vacio
    public checkAuth(email:string, password: string): boolean{

    let users: User[] = [];

    this.apiService.getUserToAuth(email,password).subscribe({
        next: resp => users = resp,
        error: error => console.error(error)
    });

    return users.length == 1;

  }

  */
}

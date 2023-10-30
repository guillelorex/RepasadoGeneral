import { Component, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/core/Models';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public newUser: User = new User();

  @Output() public UserToCreate: EventEmitter<User> = new EventEmitter();
  
  constructor(private authService: AuthService, private router: Router) {}

  /*public createUser(){
    this.UserToCreate.emit(this.newUser);
    this.router.navigate(["/login"]);
  }*/

  public async userRegister() {
    const registrationSuccessful = await this.authService.userRegister(this.newUser);
    if(registrationSuccessful) {
      this.router.navigate(['/login']);
    } else {
      alert('No se pudo registrar el usuario');
    }
  }

  public navigateToLogin(){
    this.router.navigate(['/login']); //con esto navego a login
  }
}

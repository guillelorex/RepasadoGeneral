import { Component,EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/Models';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{

  @Input() user: User = new User();
  @Input() isUser: boolean = false;
  @Output() userToEdit: EventEmitter<User> = new EventEmitter();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public goToLogin() {
    this.router.navigate(["/auth/login"]);
  }

  public goToEdit(){

    this.router.navigate(['edit']);
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  public editUser(user: User){
    this.userToEdit.emit(user);
  }
}

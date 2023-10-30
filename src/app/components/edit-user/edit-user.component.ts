import { Component, Inject, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/Models';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{

  public user: User = new User();
  // Permite pasarle como parámetro datos a un componente abierto a travez de matDialog.
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private apiService: ApiService, private dialogRef: MatDialogRef<EditUserComponent>) {

  }
  ngOnInit(): void {
    this.user = this.data;
  }

  public editUser(){

    this.apiService.editUser(this.user.id!, this.user).subscribe({
      next: () => this.dialogRef.close(true),
      error: (error) => alert(error)
    })
  }

  public closeDialog(){
    this.dialogRef.close(false);
  }

}

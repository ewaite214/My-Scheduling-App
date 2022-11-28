import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { MyService } from '../services/my-service.service';
import { Router, ActivatedRoute } from '@angular/router'
import { NavigationService } from '../navigation.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup
  valid: any
  hide: boolean = true
  errorMessage: any
  validpw: boolean = false
  emptysubjectNum = []
  activeuserlevel: string = '0'

  constructor(private fb: FormBuilder,
              private ms: MyService,
              private route: Router, 
              public dialog: MatDialog,
              private actroute: ActivatedRoute,
              private navigation: NavigationService) 
  { }


  ngOnInit() {
    this.ms.setAccess('0')
    this.initialiseForm();
    this.errorMessage = "";
    this.ms.clearActivetasktype()
  }


  signup(){
    this.route.navigate(['signup'])
  }



  // ------------------ VALIDATION WHEN SUBMITTING FORM-----------------------//
  submit(): void {
   console.log("in login submit section")
   this.route.navigate(['home'])
    let userkey = ''
    let attemptsleft = 0
    let attempts = 0
    this.validpw = false;
    if (this.LoginForm.value.Login_Username == null  || this.LoginForm.value.Login_Password == null     ){
        this.errorMessage = 'You must enter your Username and Password in order to login'
    } else {  
        this.valid = this.ms.validatePassword(this.LoginForm.value.Login_Password)
    
        if (this.valid == 'pass') {
           this.validpw = true
        }
        if (this.validpw == false) {
           this.errorMessage = 'You have entered an Invalid Password!'
        } else {
           // This was commeneted out.
           this.errorMessage = ''
           this.valid = this.ms.login(this.LoginForm.value)
           if (this.valid == "pass") { 
              userkey = this.ms.searchUser('',this.LoginForm.value.Login_Username)
              let user = this.ms.getUser(userkey)
              //console.log("in login user[0].Level= "+user[0].Level)
              if (user[0].Level == '88') {
                 this.errorMessage = ''
                 this.route.navigate(['changepassword',userkey])    
              }  else{
                 this.errorMessage = ''
                 this.route.navigate(['home'])
              }
           } else {
               if (this.valid == "fail"){
                  userkey = this.ms.searchUser('',this.LoginForm.value.Login_Username)
                  if (userkey != '' && userkey != null){
                     let user = this.ms.getUser(userkey)
                     user[0].FailedLoginCnt = user[0].FailedLoginCnt + 1 
                     this.ms.editUser(user[0],userkey)                  
                     attempts = user[0].FailedLoginCnt
                     attemptsleft = (3 - user[0].FailedLoginCnt)
                     if (user[0].Level == '1'){
                        this.errorMessage = 'Failed Administrator login, attempt No: ' + attempts
                     }  else {
                        if (attempts == 3) {
                           this.ms.lockUserAccount(userkey)
                           this.errorMessage = 'Failed login attempt No 3. Your Account is now locked. Please contact system administration.'
                        } else {
                          this.errorMessage = 'Incorrect login credentials, attempt No: ' + attempts + ". You have " + attemptsleft +" attempts remaining."
                        }
                     }
                  }  else {
                     this.errorMessage = 'Incorrect login credentials'
                  }
               }  else {
                  this.errorMessage = this.valid
               }
           }
        }
    }
    //this.LoginForm.reset();
  }

  // FORM INITIALISATION ==============================================================
  initialiseForm(): void {
    this.LoginForm = this.fb.group(
      {
        Login_Username: [null],
        Login_Password: [null],
      }
    );

  } // end initialiseForm

}
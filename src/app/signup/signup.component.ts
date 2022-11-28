import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { MyService } from '../services/my-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationService } from '../navigation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  valid: any;
  errorMessage: any;
  hide: boolean = true
  validpw: boolean = false;
  validemail: boolean = false;
  validlevel: boolean = false;
  userexists: boolean = false;
  nextUserKey: any;
  userkeynumum: number;
  initialusernum: number;
  initialsubjnum: number;
  initialtasknum: number;
  users:any;
  level: string;
  pwconfirmed: boolean = false;
  pwnotconfirmed: boolean = true;
  pwhint: boolean = false;
  checked: boolean = false;

  constructor(private fb: FormBuilder,
              private ms: MyService,
              private route: Router, 
              private actroute: ActivatedRoute,
              private navigation: NavigationService)
  { }

  changeValue(value) {     
    this.checked = !value;
  }
  
  ngOnInit() {
    this.users = this.ms.getUsers();
    if (this.users.length == 0){
       this.level = '1'
    }  else{
       this.level = '3'
    }
    
    this.pwconfirmed = false;
    this.pwnotconfirmed = true;
    this.pwhint = false;
    this.checked == false;

    this.initialiseForm();

  }

  hint(): void {
    if (this.pwhint == true){
      this.pwhint = false
    }  else{
      this.pwhint = true
    }
  }

  confirmpw(): void {
    if (this.signupForm.value.ConfirmPassword != null && this.signupForm.value.ConfirmPassword != '' &&this.signupForm.value.ConfirmPassword == this.signupForm.value.Password) {  
    this.pwconfirmed = true;
    this.pwnotconfirmed = false;
    }  else {  
    this.pwconfirmed = false;
    this.pwnotconfirmed = true;
    }
  }

  // ------------------ VALIDATION WHEN SUBMITTING FORM---------------------------------------//
  submit(): void {
    this.errorMessage = ''
    if (this.checked == true){ 
      this.signupForm.value.AgreeToTerms = 'Y'
    } else {
      this.signupForm.value.AgreeToTerms = 'N'
    }
    this.errorMessage = this.ms.validateSignup(this.signupForm)
    if (this.errorMessage == '' || this.errorMessage == null) {
       this.ms.addUser(this.signupForm.value);
       this.route.navigate(['login'])
    } 
  }


  // FORM INITIALISATION ==============================================================
  initialiseForm(): void {
    this.userkeynumum = Number(this.ms.getUserKeynum())
    if (this.userkeynumum < 10000000001) {
        this.initialusernum = 10000000002
        this.ms.setUserKeynum(this.initialusernum)
        this.initialsubjnum = 10000000002
        this.ms.setSubjKeynum(this.initialsubjnum)
        this.initialtasknum = 10000000002
        this.ms.setTaskKeynum(this.initialtasknum)
    }
    //
    this.nextUserKey = this.ms.getnextUserKey();
    this.signupForm = this.fb.group(
      {
        FirstName: [null],
        Surname: [null],
        UserKey: [this.nextUserKey],
        Username: [null],
        Email: [null],
        Level: [this.level],
        Password: [null],
        ConfirmPassword: [null],
        AssessmentSortOption: ['duedate'],
        ExamSortOption: ['duedate'],
        CompletedSortOption: ['donedate'],
        SubjSumSortOption: ['donedate'],
        CountdownDays: [7],
        Language: ['ENG'],
        DateFormat: ['dd month yyyy'],
        FailedLoginCnt: [0],
        ShowDoneDialog: ['Y'],
        ShowDeleteTaskDialog: ['Y'],
        ShowDeleteSubjectDialog: ['Y'],
        AgreeToTerms: [this.checked]
      }
    );

  } // end initialiseForm
  backWithNavigation() {
    this.navigation.back();
  }

}
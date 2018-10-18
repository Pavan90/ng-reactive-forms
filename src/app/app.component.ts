import {Component, OnInit} from '@angular/core';
/*
import {FormControl, FormGroup} from '@angular/forms';
*/
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {forbiddenNameValidator} from './shared/user-name.validator';
import {passwordValidator} from './shared/password.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  registrationForm: FormGroup;
  get userName() {
    return this.registrationForm.get('userName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required,  Validators.minLength(3), forbiddenNameValidator(/password/)]],
      password: [''],
      email: [''],
      subscribe: [],
      confirmPassword: [''],
      address: this.fb.group({
        city: [''],
        state: [''],
        postalCode: ['']
      })
    }, {validator: passwordValidator});
    // conditional validators
    this.registrationForm.get('subscribe').valueChanges
      .subscribe(checkedValue => {
          const email = this.registrationForm.get('email');
          if (checkedValue) {
            email.setValidators(Validators.required);
          } else {
            email.clearValidators();
          }
          email.updateValueAndValidity();
      });
  }




/*
  registrationForm = new FormGroup({
    userName : new FormControl('pavan'),
    password : new FormControl(''),
    confirmPassword : new FormControl(''),
    address: new FormGroup({
      city : new FormControl(''),
      state : new FormControl(''),
      postalCode : new FormControl('')
    })
  });
*/

  loadApiData() {
 /*   this.registrationForm.setValue({
      userName: 'lee',
      password: 'test',
      confirmPassword: 'test',
      address: {
        city: 'city',
        state: 'state',
        postalCode: '23456'
      }
    });*/

 /*   this.registrationForm.patchValue({
      userName: 'lee',
      password: 'test',
      confirmPassword: 'test',

    });*/
  }
}

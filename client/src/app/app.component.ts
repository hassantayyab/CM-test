import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormService } from './services/form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Form';

  siteKey = '6LcNJb4UAAAAAJPRydoVa8UX2cxu-JzSQUVPE4Gs';

  formStep = 1;

  firstStepForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['',[ Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(10),Validators.pattern('^(0|[1-9][0-9]*)$')]],
    address: ['', [Validators.required]],
    gender: ['m', [Validators.required]]
  });

  secondStepForm = this.fb.group({
    query: ['', Validators.required],
  });

  thirdStepForm = this.fb.group({
    email: ['',[ Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder, private formS: FormService) {}

  resolvedCaptcha = false;

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.resolvedCaptcha = true;
}

  emailValidationError = false;

  validateEmail() {
    if (this.thirdStepForm.get('email').value == this.firstStepForm.get('email').value) {
      this.emailValidationError = false;
    } else {
      this.emailValidationError = true;      
    }
  }

  prevStep(step) {
    this.formStep = step;
  }

  nextStep(step) {
    console.log(this.firstStepForm.valid);
    
    switch (step) {
      case 2:
        if (this.firstStepForm.valid) {
          this.formStep = step;
        }
        break;
    
      case 3:
        if (this.secondStepForm.valid) {
          this.formStep = step;
        }
        break;
    }
  }

  submitForm() {
    if (this.thirdStepForm.valid && this.resolvedCaptcha && !this.emailValidationError) {
      const obj = {
        firstName: this.firstStepForm.get('firstName').value,
        lastName: this.firstStepForm.get('lastName').value,
        email: this.firstStepForm.get('email').value,
        phone: this.firstStepForm.get('phone').value,
        address: this.firstStepForm.get('address').value,
        gender: this.firstStepForm.get('gender').value,
        query: this.secondStepForm.get('query').value
      }
  
      this.formS.postForm(obj).then((result) => {
        console.log('res =', result);
        this.resolvedCaptcha = false;
        this.firstStepForm.reset();
        this.secondStepForm.reset();
        this.thirdStepForm.reset();
        this.formStep = 1;
        
      }).catch((err) => {
        
      });
    }
  }
}

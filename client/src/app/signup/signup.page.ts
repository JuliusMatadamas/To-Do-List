import { Component, OnInit } from '@angular/core';
import { ToastController } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ResponseInterface } from "../interfaces/response.interface";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
    // @ts-ignore
    signupForm: FormGroup;

    constructor(
        private toastController: ToastController,
        private formBuilder: FormBuilder,
        private router: Router,
        private http: HttpClient
    ) { }

    async showToast(position: 'top' | 'middle' | 'bottom', message: string, color: string, callback?: () => void) {
        const toast = await this.toastController.create({
            message: message,
            duration: 1500,
            position: position,
            color: color
        });
        toast.onDidDismiss().then(() => {
            if (callback) {
                callback();
            }
        });
        await toast.present();
    }

    ngOnInit() {
        this.signupForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email, this.emailDomainValidator]],
            password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10), this.noSpacesValidator]]
        });
    }

    // @ts-ignore
    emailDomainValidator(control) {
        const email = control.value;
        const domain = email.split('@')[1];
        if (domain) {
            const parts = domain.split('.');
            if (parts.length > 1 && parts[1].length >= 2) {
                return null;
            }
        }
        return {emailDomain: true};
    }

    // @ts-ignore
    noSpacesValidator(control) {
        const password = control.value;
        if (password && password.indexOf(' ') === -1) {
            return null;
        }
        return {noSpaces: true};
    }

    validateForm() {
        if (this.signupForm.valid) {
            // @ts-ignore
            const email = this.signupForm.get('email').value;
            // @ts-ignore
            const password = this.signupForm.get('password').value;
            this.sendFormData({ email, password });
        } else {
            const { email, password } = this.signupForm.controls;
            if (email.status === "INVALID") {
                this.showToast('top', '¡Ingrese un email válido!', 'danger');
                return;
            }

            if (password.status === "INVALID") {
                this.showToast('top', '¡El password debe tener entre 5 y 10 caracteres sin espacios!', 'danger');
                return;
            }
        }
    }

    private sendFormData(data: { email: string, password: string }) {
        this.http.post<ResponseInterface>('http://localhost:3000/auth/signup', data).subscribe((response: ResponseInterface) => {
            const message = response.message;
            const data = JSON.parse(JSON.stringify(response.data));
            localStorage.setItem('_id', data._id);
            localStorage.setItem('email', data.email);
            localStorage.setItem('token', data.token);
            this.showToast('top', message, 'success', () => {
                this.router.navigate(['/home']);
            });
        },
        error => {
            let message = error.error.message;
            if (message.includes('E11000 duplicate')) {
                message = "¡El email ya se encuentra registrado en la BD!";
            }
            this.showToast('top', message, 'danger');
        });
    }
}

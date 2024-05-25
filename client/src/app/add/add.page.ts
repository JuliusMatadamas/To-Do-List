import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController  } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { ResponseInterface } from "../interfaces/response.interface";


@Component({
    selector: 'app-add',
    templateUrl: './add.page.html',
    styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
    // @ts-ignore
    addForm: FormGroup;

    constructor(
        private toastController: ToastController,
        private loadingController: LoadingController,
        private formBuilder: FormBuilder,
        private router: Router,
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.addForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[^\s]+(\s+[^\s]+)*$/)]],
            description: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[^\s]+(\s+[^\s]+)*$/)]]
        });
    }

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

    validateForm() {
        if (this.addForm.valid) {
            const userId = localStorage.getItem('userId');
            // @ts-ignore
            const title: string = this.addForm.get('title').value;
            // @ts-ignore
            const description: string = this.addForm.get('description').value;
            const status: string = "Incompleta";
            // @ts-ignore
            this.sendFormData({ userId, title, description, status });
        } else {
            const { title, description } = this.addForm.controls;
            if (title.status === "INVALID") {
                this.showToast('top', '¡El título de la tarea debe tener por lo menos 2 caracteres!', 'danger');
                return;
            }

            if (description.status === "INVALID") {
                this.showToast('top', '¡La descripción de la tarea debe tener al menos 5 caracteres!', 'danger');
                return;
            }
        }
    }

    private async sendFormData(data: { userId: string, title: string, description: string, status: string }) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const loading = await this.loadingController.create({
            message: 'Guardando...',
            spinner: 'circles'
        });
        await loading.present();
        this.http.post<ResponseInterface>('http://localhost:3000/todo/create', data, { headers }).subscribe(async (response: ResponseInterface) => {
                const message = response.message;
                await loading.dismiss();
                this.showToast('top', message, 'success', () => {
                    this.router.navigate(['/home']);
                });
            },
            async error => {
                let message = error.error.message;
                await loading.dismiss();
                this.showToast('top', message, 'danger');
            });
    }
}

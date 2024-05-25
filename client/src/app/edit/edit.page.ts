import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ViewWillEnter } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastController } from "@ionic/angular";
import { ResponseInterface } from "../interfaces/response.interface";
import { TodoInterface } from "../interfaces/todo.interface";


@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
    // @ts-ignore
    id: string;
    // @ts-ignore
    editForm: FormGroup;
    // @ts-ignore
    data: TodoInterface;

    constructor(
        private activatedRoute: ActivatedRoute,
        private toastController: ToastController,
        private loadingController: LoadingController,
        private formBuilder: FormBuilder,
        private router: Router,
        private http: HttpClient
    ) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.id = params['_id'];
        });

        this.editForm = this.formBuilder.group({
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

    ionViewWillEnter() {
        const userId = localStorage.getItem('_id');
        const _id: string = this.id;
        // @ts-ignore
        this.cargarData({ _id, userId });
    }

    private async cargarData(data: { _id: string, userId: string }) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const loading = await this.loadingController.create({
            message: 'Obteniendo datos...',
            spinner: 'circles'
        });
        await loading.present();
        this.http.post<ResponseInterface>('http://localhost:3000/todo/findById', data, { headers }).subscribe(async (response: ResponseInterface) => {
                const message = response.message;
                this.data = JSON.parse(JSON.stringify(response.data));
                this.editForm.patchValue({ title: this.data.title });
                this.editForm.patchValue({ description: this.data.description });
                await loading.dismiss();
                this.showToast('top', message, 'success');
            },
            async error => {
                let message = error.error.message;
                await loading.dismiss();
                this.showToast('top', message, 'danger');
            });
    }

    async completeTodo() {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const loading = await this.loadingController.create({
            message: 'Guardando...',
            spinner: 'circles'
        });
        await loading.present();
        // @ts-ignore
        const title = this.editForm.get('title').value;
        // @ts-ignore
        const description = this.editForm.get('description').value;
        const data = {
            "_id": this.data._id,
            "userId": localStorage.getItem('userId'),
            "title": title,
            "description": description,
            "status": "Completada"
        }
        this.http.put<ResponseInterface>('http://localhost:3000/todo/update', data, { headers }).subscribe(async (response: ResponseInterface) => {
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

    async deleteTodo() {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const loading = await this.loadingController.create({
            message: 'Eliminando...',
            spinner: 'circles'
        });
        await loading.present();
        const data = {
            "_id": this.data._id,
            "userId": localStorage.getItem('userId'),
        }
        const options = {
            headers: headers,
            body: data
        };
        this.http.delete<ResponseInterface>('http://localhost:3000/todo/delete', options).subscribe(async (response: ResponseInterface) => {
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

    validateForm() {
        if (this.editForm.valid) {
            const _id: string = this.data._id;
            const userId = localStorage.getItem('userId');
            // @ts-ignore
            const title: string = this.editForm.get('title').value;
            // @ts-ignore
            const description: string = this.editForm.get('description').value;
            const status: string = this.data.status;
            // @ts-ignore
            this.sendFormData({ _id, userId, title, description, status });
        } else {
            const { title, description } = this.editForm.controls;
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

    private async sendFormData(data: { _id: string, userId: string, title: string, description: string, status: string }) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const loading = await this.loadingController.create({
            message: 'Guardando...',
            spinner: 'circles'
        });
        await loading.present();
        this.http.put<ResponseInterface>('http://localhost:3000/todo/update', data, { headers }).subscribe(async (response: ResponseInterface) => {
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

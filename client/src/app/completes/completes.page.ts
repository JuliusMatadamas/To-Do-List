import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ResponseInterface } from "../interfaces/response.interface";
import { ToastController, LoadingController  } from "@ionic/angular";
import { Router } from "@angular/router";
import { TodoInterface } from "../interfaces/todo.interface";

@Component({
    selector: 'app-completes',
    templateUrl: './completes.page.html',
    styleUrls: ['./completes.page.scss'],
})
export class CompletesPage implements OnInit {
    // @ts-ignore
    data: TodoInterface[];

    constructor(
        private toastController: ToastController,
        private loadingController: LoadingController,
        private router: Router,
        private http: HttpClient
    ) {}

    ngOnInit() {
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
        // @ts-ignore
        this.cargarData({ userId });
    }

    private async cargarData(data: { userId: string }) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const loading = await this.loadingController.create({
            message: 'Obteniendo datos...',
            spinner: 'circles'
        });
        await loading.present();
        this.http.post<ResponseInterface>('http://localhost:3000/todo/findAll/completes', data, { headers }).subscribe(async (response: ResponseInterface) => {
                const message = response.message;
                this.data = JSON.parse(JSON.stringify(response.data));
                await loading.dismiss();
                this.showToast('top', message, 'success');
            },
            async error => {
                let message = error.error.message;
                await loading.dismiss();
                this.showToast('top', message, 'danger');
            });
    }

    async deleteAllTodos() {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        const loading = await this.loadingController.create({
            message: 'Eliminando...',
            spinner: 'circles'
        });
        await loading.present();
        const data = {
            "_id": localStorage.getItem('_id'),
            "userId": localStorage.getItem('userId'),
        }
        const options = {
            headers: headers,
            body: data
        };
        this.http.delete<ResponseInterface>('http://localhost:3000/todo/delete/completes', options).subscribe(async (response: ResponseInterface) => {
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

import { Component, OnInit } from '@angular/core';
import { ToastController } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";


@Component({
    selector: 'app-add',
    templateUrl: './add.page.html',
    styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
    // @ts-ignore
    addForm: FormGroup;
    // @ts-ignore
    dateTime: string;

    constructor(
        private toastController: ToastController,
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
        } else {
            const { title, description } = this.addForm.controls;
            if (title.status === "INVALID") {
                this.showToast('top', '¡El título de la tarea debe tener por lo menos 2 caracteres!', 'danger');
                return;
            }

            if (description.status === "INVALID") {
                this.showToast('top', '¡La descripción de la tarea debe tener al menos5 caracteres!', 'danger');
                return;
            }
        }
    }
}

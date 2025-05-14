import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {MatCard} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [
    MatCard,
    MatFormField,
    MatLabel,
    MatFormField,
    MatFormField,
    MatInput,
    FormsModule,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    MatButton
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient,  private router: Router) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      localidad_id: 1,
      nombre_usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const datos = this.registerForm.value;

      this.http.post('http://20.55.45.214/registro.php', datos)
        .subscribe({
          next: (res) => {
            alert('Usuario registrado correctamente');
            console.log(res);
            this.router.navigate(['/home']); // 👈 Redirige a /home
          },
          error: (err) => {
            alert('Error al registrar usuario');
            console.error(err);
          }
        });
    } else {
      alert('Por favor completa todos los campos');
    }
  }
}

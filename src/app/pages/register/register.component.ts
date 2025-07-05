import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {MatCard} from '@angular/material/card';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

import {Router, RouterLink} from '@angular/router';


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
    MatButton,
    RouterLink
  ],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient,  private router: Router) {
    this.registerForm = this.fb.group({
      nombre_usuario: ['', Validators.required],  // Username
      correo: ['', [Validators.required, Validators.email]],  // Email
      contrasena: ['', Validators.required],  // Password
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const datos = this.registerForm.value;

      // Enviar datos al servidor
      this.http.post('http://20.121.43.34:3000/api/users', {
        username: datos.nombre_usuario,
        email: datos.correo,
        password: datos.contrasena,
        photoUrl: '',  // Valores vacíos para estos campos
        bio: '',
        favoriteGenres: [],
        followers: [],
        following: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
        .subscribe({
          next: (res) => {
            alert('Usuario registrado correctamente');
            console.log(res);
            this.router.navigate(['/login']); // Redirige a /home después del registro
          },
          error: (err) => {
            alert('Error al registrar usuario');
            console.error(err);
          }
        });
    }
  }
}

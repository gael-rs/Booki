import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
      private fb: FormBuilder,
      private http: HttpClient,
      private router: Router
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const datos = {
        nombre_usuario: this.loginForm.value.usuario,
        contrasena: this.loginForm.value.contrasena
      };

      this.http.post<any>('http://20.55.45.214/login.php', datos).subscribe({
        next: (res) => {
          if (res.mensaje === 'Login exitoso') {
            localStorage.setItem('usuario_id', res.usuario_id);
            alert('Bienvenido');
            this.router.navigate(['/home']);
          } else {
            alert('Credenciales inválidas');
          }
        },
        error: (err) => {
          console.error('Error en el login', err);
          alert('Ocurrió un error al intentar iniciar sesión');
        }
      });
    } else {
      alert('Por favor completa todos los campos');
    }
  }
}

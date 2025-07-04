import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

// Definición de la interfaz Usuario
interface Usuario {
  _id: string;
  email: string;
  password: string;
  // Otros campos si son necesarios
}

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    // Crear el formulario de login
    this.loginForm = this.fb.group({
      correo: ['', Validators.required],   // Campo para el correo electrónico
      contrasena: ['', Validators.required] // Campo para la contraseña
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const datos = {
        email: this.loginForm.value.correo,     // Obtener correo
        password: this.loginForm.value.contrasena // Obtener contraseña
      };

      // Enviar una solicitud GET a la API para obtener todos los usuarios
      this.http.get<Usuario[]>('http://20.121.43.34:3000/api/users').subscribe({
        next: (usuarios) => {
          // Filtrar los usuarios que coincidan con el correo y la contraseña
          const usuario = usuarios.find(u => u.email === datos.email && u.password === datos.password);

          if (usuario) {
            // Si el usuario es encontrado, almacenar el ID en el localStorage y redirigir
            localStorage.setItem('usuario_id', usuario._id);
            alert('Bienvenido');
            this.router.navigate(['/home']);
          } else {
            // Si no se encuentra, mostrar un mensaje de error
            alert('Credenciales inválidas');
          }
        },
        error: (err) => {
          console.error('Error al obtener usuarios', err);
          alert('Ocurrió un error al intentar iniciar sesión');
        }
      });
    } else {
      alert('Por favor completa todos los campos');
    }
  }
}

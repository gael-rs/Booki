import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';

import { Router } from '@angular/router'; // IMPORTANTE

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  libros: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {

    const usuario_id = localStorage.getItem('usuario_id');
    if (!usuario_id) {
      alert('Debes iniciar sesión primero');
      this.router.navigate(['/login']);
      return;
    }



    this.http.get<any[]>('http://20.55.45.214/get_libros.php')
      .subscribe({
        next: data => {
          this.libros = data.map(libro => {
            let imagenUrl = '';

            switch (libro.autor) {
              case 'Paulo Coelho':
                imagenUrl = 'https://www.libreriasur.com.pe/imagenes/9786287/978628757443.webp';
                break;
              case 'Yuval Noah Harari':
                imagenUrl = 'https://www.libreriasur.com.pe/imagenes/9788419/978841939971.webp';
                break;
              case 'George Orwell':
                imagenUrl = 'https://www.libreriasur.com.pe/imagenes/9788491/978849111764.webp';
                break;
              case 'Eckhart Tolle':
                imagenUrl = 'https://www.libreriasur.com.pe/imagenes/9788484/978848445701.webp';
                break;
              case 'J.K. Rowling':
                imagenUrl = 'https://www.libreriasur.com.pe/imagenes/9788418/978841817407.webp';
                break;
              default:
                imagenUrl = 'https://i.imgur.com/oH8lL4u.jpg'; // Imagen por defecto
            }

            return { ...libro, imagen_url: imagenUrl };
          });
        },
        error: err => console.error('Error al obtener libros:', err)
      });
  }


  eliminarCuenta(): void {
    const usuario_id = localStorage.getItem('usuario_id');

    if (!usuario_id) {
      alert('No se pudo encontrar el ID del usuario');
      return;
    }

    const confirmacion = confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.');

    if (!confirmacion) return;

    this.http.post('http://20.55.45.214/eliminar_usuario.php', { usuario_id }).subscribe({
      next: (res: any) => {
        if (res.mensaje === 'Cuenta eliminada correctamente') {
          alert('Tu cuenta ha sido eliminada con éxito');
          localStorage.removeItem('usuario_id');
          this.router.navigate(['/login']);
        } else {
          alert('Ocurrió un error al eliminar la cuenta');
          console.log(res);
        }
      },
      error: err => {
        console.error('Error al eliminar la cuenta:', err);
        alert('Hubo un problema al intentar eliminar tu cuenta.');
      }
    });
  }
}



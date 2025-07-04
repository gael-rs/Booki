import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button'; // IMPORTANTE

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isSidebarExpanded = false;
  isHomePage = true;  // Empezamos en la página Home
  isProfilePage = false;

  publicaciones = [
    {
      BookTitle: 'Mi primer post',
      autor: 'Juan Pérez',
      content: 'Este es el contenido de mi primer post. Estoy muy emocionado de compartirlo con todos.',
      imgUrl: 'https://www.crisol.com.pe/media/catalog/product/cache/cf84e6047db2ba7f2d5c381080c69ffe/9/7/9781404117150.jpg',  // URL de la imagen
      likes: 25,
      commentCount: 10
    },
    {
      BookTitle: 'Un día en la playa',
      autor: 'Ana Gómez',
      content: 'Hoy fui a la playa y fue increíble. El mar, la arena y el sol, todo perfecto.',
      imgUrl: 'https://www.crisol.com.pe/media/catalog/product/cache/cf84e6047db2ba7f2d5c381080c69ffe/9/7/9786124404597_wdvknxij4gex4o57.jpg',  // URL de la imagen
      likes: 30,
      commentCount: 5
    },
    {
      BookTitle: 'Cocinando mi receta favorita',
      autor: 'Carlos Ruiz',
      content: 'Hoy cociné mi receta favorita de pasta. ¡Les dejo una foto de cómo quedó!',
      imgUrl: 'https://www.crisol.com.pe/media/catalog/product/cache/cf84e6047db2ba7f2d5c381080c69ffe/9/7/9786125177162_wmnan7zvjl9gaho9.jpg',  // URL de la imagen
      likes: 15,
      commentCount: 8
    }
  ];


  // Hardcodeando el usuario con más detalles
  usuario = {
    nombre: 'Juan Pérez',
    email: 'juan.perez@example.com',
    username: 'juanperez123',  // Username
    photoUrl: 'https://img.freepik.com/foto-gratis/retrato-hombre-blanco-aislado_53876-40306.jpg',  // Foto de perfil
    bio: 'Amante de los libros, escritor aficionado y fotógrafo amateur.',  // Bio
    favoriteGenres: ['Ficción', 'Aventura', 'Ciencia ficción'],  // Géneros favoritos
    followers: ['ana_gomez', 'carlos_ruiz'],  // Lista de seguidores
    following: ['juanperez123', 'ana_gomez'],  // Lista de seguidos
    publicaciones: [
      {
        titulo: 'Mi primer post',
        autor: 'Juan Pérez',
        descripcion: 'Este es el contenido de mi primer post. Estoy muy emocionado de compartirlo con todos.',
      },
      {
        titulo: 'Cocinando mi receta favorita',
        autor: 'Carlos Ruiz',
        descripcion: 'Hoy cociné mi receta favorita de pasta. ¡Les dejo una foto de cómo quedó!',
      }
    ]
  };

  // Función para cambiar a la página de Home
  goToHome() {
    this.isHomePage = true;
    this.isProfilePage = false;
  }

  // Función para cambiar a la página de Profile
  goToProfile() {
    this.isHomePage = false;
    this.isProfilePage = true;
  }
}

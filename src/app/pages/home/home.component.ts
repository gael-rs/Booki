import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {ApiService} from '../../api.service'; // IMPORTANTE

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

  publicaciones: any[] = [];
    usuario: any = {};
  newPost: any = {
    content: '',
    imageUrl: '',
    bookTitle: '',
    author: ''
  };

  // Variables para la edición de géneros favoritos
  isEditingGenres = false;  // Controla si estamos en modo de edición
  newGenres: string = '';  // Almacenar los nuevos géneros favoritos


  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // Cargar publicaciones y usuario al inicializar el componente
    this.loadPosts();
    this.loadUsers();
  }

  loadPosts() {
    this.apiService.getPosts().subscribe(
      (data) => {
        this.publicaciones = data;
      },
      (error) => {
        console.error('Error al obtener las publicaciones', error);
      }
    );
  }

  loadUsers() {
    const userId = localStorage.getItem('usuario_id');  // Obtener el ID del usuario logueado desde el localStorage
    console.log('usuario_id obtenido:', userId);  // Verifica que se está obteniendo el ID correctamente

    if (userId) {
      this.apiService.getUserById(userId).subscribe(
        (data) => {
          console.log('Datos del usuario:', data);  // Verifica los datos recibidos de la API
          this.usuario = data;  // Asigna la respuesta de la API al objeto usuario
        },
        (error) => {
          console.error('Error al obtener el usuario', error);
        }
      );
    } else {
      console.log('No hay usuario logueado');
    }
  }


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

  submitPost() {
    if (this.newPost.bookTitle && this.newPost.author && this.newPost.content && this.newPost.imageUrl) {
      this.apiService.createPost(this.newPost).subscribe(
        (response) => {
          console.log('Publicación creada con éxito', response);
          this.loadPosts();  // Recargar las publicaciones después de crear una nueva
          this.newPost = { title: '', author: '', content: '', imageUrl: '' }; // Limpiar el formulario
        },
        (error) => {
          console.error('Error al crear la publicación', error);
        }
      );
    } else {
      console.error('Faltan campos en el formulario');
    }
  }

  // Función para iniciar la edición de géneros
  editGenres() {
    this.isEditingGenres = true;
    this.newGenres = this.usuario.favoriteGenres.join(', ');  // Pre-cargar los géneros actuales en el campo
  }

  // Función para guardar los géneros favoritos actualizados
  saveGenres() {
    const updatedGenres = this.newGenres.split(',').map(genre => genre.trim());  // Separar los géneros ingresados por coma
    this.usuario.favoriteGenres = updatedGenres;  // Actualizar la lista de géneros favoritos del usuario

    // Aquí llamaríamos a una API para guardar los géneros actualizados en el servidor
    this.apiService.updateUserGenres(this.usuario._id, updatedGenres).subscribe(
      (response) => {
        console.log('Géneros favoritos actualizados:', response);
        this.isEditingGenres = false;  // Finalizar la edición
      },
      (error) => {
        console.error('Error al actualizar los géneros favoritos', error);
      }
    );
  }

  // Función para cancelar la edición de géneros
  cancelEdit() {
    this.isEditingGenres = false;
    this.newGenres = '';  // Limpiar el campo
  }
}



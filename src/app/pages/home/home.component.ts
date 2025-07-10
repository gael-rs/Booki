import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {ApiService} from '../../api.service';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input'; // IMPORTANTE
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    MatFormField,
    MatFormField,
    MatLabel,
    MatInput,
    MatLabel,
    MatFormField,
    MatButtonModule, MatDividerModule, MatIconModule
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
  isEditingProfiles = false;  // Controla si estamos en modo de edición
  newProfile: string = '';  // Almacenar los nuevos géneros favoritos


  constructor(private apiService: ApiService, private http: HttpClient) {}

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

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    this.apiService.uploadUserPhoto(formData).subscribe({
      next: (res) => {
        this.usuario.photoUrl = res.url;
        console.log('Imagen guardada localmente:', res.url);
      },
      error: (err) => {
        console.error('Error al subir imagen local:', err);
      }
    });
  }

  // Función para iniciar la edición de géneros
  editGenres() {
    this.isEditingProfiles = true;
    this.newProfile = this.usuario.favoriteGenres.join(', ');  // Pre-cargar los géneros actuales en el campo
  }

  // Función para guardar los géneros favoritos actualizados
  saveProfile() {
    const updatedGenres = this.newProfile.split(',').map(genre => genre.trim());
    this.usuario.favoriteGenres = updatedGenres;

    const updatedUser = {
      username: this.usuario.username,
      favoriteGenres: updatedGenres,
      photoUrl: this.usuario.photoUrl,
      bio: this.usuario.bio
    };

    this.apiService.updateUser(this.usuario._id, updatedUser).subscribe(
      (response) => {
        console.log('Perfil actualizado', response);
        this.isEditingProfiles = false;
      },
      (error) => {
        console.error('Error al actualizar perfil', error);
      }
    );
  }


  // Función para cancelar la edición de géneros
  cancelEdit() {
    this.isEditingProfiles = false;
    this.newProfile = '';  // Limpiar el campo
  }
}



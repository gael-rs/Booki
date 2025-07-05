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
    this.apiService.getUsers().subscribe(
      (data) => {
        this.usuario = data;
      },
      (error) => {
        console.error('Error al obtener el usuario', error);
      }
    );
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
}



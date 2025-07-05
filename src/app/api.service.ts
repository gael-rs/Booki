import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://20.121.43.34:3000/api';  // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient) { }

  // Obtener todas las publicaciones
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/posts`);
  }

  createPost(postData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/posts`, postData);
  }

  // Obtener todos los usuarios
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }



  // Obtener un solo usuario
  getUserById(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`);
  }

  // Método para actualizar los géneros favoritos del usuario
  updateUserGenres(userId: string, genres: string[]): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${userId}`, { favoriteGenres: genres });
  }

  // Obtener los comentarios de un post
  getComments(postId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/comments?postId=${postId}`);
  }

  // Obtener los seguidores de un usuario
  getFollows(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/follows?userId=${userId}`);
  }

  // Obtener los likes de un post
  getLikes(postId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/likes?postId=${postId}`);
  }

  // Obtener las notificaciones
  getNotifications(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/notifications?userId=${userId}`);
  }
}

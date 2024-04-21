import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { Tarea } from '../Models/Tarea';
import { ResponseAPI } from '../Models/ResponseAPI';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  private http = inject(HttpClient);
  private apiUrl:string = appsettings.apiUrl + "Tarea";

  constructor() { }

  listar(){
    return this.http.get<Tarea[]>(this.apiUrl);
  }
  obtener(id:number){
    return this.http.get<Tarea>(`${this.apiUrl}/${id}`);
  }

  crear(tarea:Tarea){
    return this.http.post<ResponseAPI>(this.apiUrl,tarea);
  }

  actualizar(tarea:Tarea){
    return this.http.put<ResponseAPI>(this.apiUrl,tarea);
  }

  eliminar(id:number){
    return this.http.delete<ResponseAPI>(`${this.apiUrl}/${id}`);
  }
}
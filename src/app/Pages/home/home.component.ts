import { Component, inject } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { TareaService } from '../../Services/tarea.service';
import { Tarea } from '../../Models/Tarea';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule,MatTableModule,MatIconModule,MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private TareaServicio = inject(TareaService);
  public listaTareas:Tarea[] = [];
  public displayedColumns : string[] = ['nombre','descripcion','fechaCreacion','fechaVencimiento','estado','prioridad','accion'];

  listarTareas(){
    this.TareaServicio.listar().subscribe({
      next:(data)=>{
        if(data.length > 0){
          this.listaTareas = data;
        }
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }

  constructor(private router:Router){
    this.listarTareas();
  }

  crear(){
    this.router.navigate(['/tarea',0]);
  }

  actualizar(tarea:Tarea){
    this.router.navigate(['/tarea',tarea.id]);
  }

  eliminar(tarea:Tarea){
    if(confirm("Desea eliminar la Tarea " + tarea.nombre)){
      this.TareaServicio.eliminar(tarea.id).subscribe({
        next:(data)=>{
          if(data.isSuccess){
            this.listarTareas();
          }else{
            alert("no se pudo eliminar")
          }
        },
        error:(err)=>{
          console.log(err.message)
        }
      })
    }
  }
}
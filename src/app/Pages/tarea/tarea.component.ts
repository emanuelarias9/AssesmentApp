import { Component, Input, OnInit, inject } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormBuilder,FormGroup,ReactiveFormsModule} from '@angular/forms';
import { TareaService } from '../../Services/tarea.service';
import { Router } from '@angular/router';
import { Tarea } from '../../Models/Tarea';

@Component({
  selector: 'app-tarea',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule,MatSelectModule,MatDatepickerModule],
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.css'
})

export class TareaComponent implements OnInit {

  @Input('id') id! : number;
  private tareaServicio = inject(TareaService);
  public formBuild = inject(FormBuilder);

  public formTarea:FormGroup = this.formBuild.group({
    nombre: [''],
    descripcion:[''],
    fechaCreacion:[''],
    fechaVencimiento:[''],
    estado:[''],
    prioridad:['']
  });

  constructor(private router:Router){}

  ngOnInit(): void {
    if(this.id != 0){
      this.tareaServicio.obtener(this.id).subscribe({
        next:(data) =>{
          this.formTarea.patchValue({
            nombre: data.nombre,
            descripcion:data.descripcion,
            fechaCreacion:data.fechaCreacion,
            fechaVencimiento:data.fechaVencimiento,
            estado:data.estado,
            prioridad:data.prioridad
          })
        },
        error:(err) =>{
          console.log(err.message)
        }
      })
    }
  }

  guardar(){
    const tarea : Tarea = {
      id : this.id,
      nombre: this.formTarea.value.nombre,
      descripcion: this.formTarea.value.descripcion,
      fechaCreacion:this.formTarea.value.fechaCreacion,
      fechaVencimiento:this.formTarea.value.fechaVencimiento,
      estado:this.formTarea.value.estado,
      prioridad:this.formTarea.value.prioridad,
    }

    if(this.id == 0){
      this.tareaServicio.crear(tarea).subscribe({
        next:(data) =>{
          if(data.isSuccess){
            this.router.navigate(["/"]);
          }else{
            alert("Error al crear")
          }
        },
        error:(err) =>{
          console.log(err.message)
        }
      })
    }else{
      this.tareaServicio.actualizar(tarea).subscribe({
        next:(data) =>{
          if(data.isSuccess){
            this.router.navigate(["/"]);
          }else{
            alert("Error al editar")
          }
        },
        error:(err) =>{
          console.log(err.message)
        }
      })
    }
  }

  volver(){
    this.router.navigate(["/"]);
  }
}
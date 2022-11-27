import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente()
  titulo:string = "Crear Cliente"

  errores: string[];

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.cargarCliente()
  }

  cargarCliente(): void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    })
  }

  create():void{
    this.clienteService.create(this.cliente)
    .subscribe(json => {
      this.router.navigate(['/clientes'])
      Swal.fire(  'Nuevo Cliente',  `Cliente ${json.cliente.nombre} creado con exito!`,  'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        
      }
      );
  }

  update():void{
    this.clienteService.update(this.cliente)
    .subscribe( json => {
      this.router.navigate(['/clientes'])
      Swal.fire(  'Cliente Actualizado',  `Cliente ${json.cliente.nombre} actualizado con exito!`,  'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        
      }
    )
  }
}

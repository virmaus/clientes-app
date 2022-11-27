import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { map, Observable, catchError , throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class ClienteService {

  private urlEndpoint: string = "http://localhost:8080/api/clientes";

  constructor(private http: HttpClient, private router: Router) { }

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  getClientes() : Observable<Cliente[]> {
     //return this.http.get<Cliente[]>(this.urlEndpoint);
     return this.http.get(this.urlEndpoint).pipe(
      map(response => response as Cliente[])
     );
  }

  create(cliente: Cliente) : Observable<any>{
    return this.http.post<Cliente>(this.urlEndpoint,cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {

        if(e.status==400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje,e.error.error , 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id: any): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
        catchError(e => {
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
          Swal.fire('Error al editar', e.error.mensaje , 'error');
          return throwError(e);
        })
    );
  }

  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndpoint}/${cliente.id}`,cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {

        if(e.status==400){
          return throwError(e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje,e.error.error , 'error');
        return throwError(e);
      })
    );
  }

  delete(id : number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje,e.error.error , 'error');
        return throwError(e);
      })
    )
  }

}

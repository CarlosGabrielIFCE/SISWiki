import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageProvider {
  usuario: any = [];
  perguntas: any = [];

  constructor(public http: HttpClient) {
    this.usuario = [];
    this.perguntas = [];
  }

  getUsuario() {
    return this.usuario;
  }

  setUsuario(usuario) {
    this.usuario = usuario;
  }

  getPerguntas() {
    return this.perguntas;
  }

  setPerguntas(perguntas) {
    this.perguntas = perguntas;
  }

}

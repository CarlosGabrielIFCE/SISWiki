import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

@Injectable()
export class StorageProvider {
  db: SQLiteObject;
  ba: any = {};
  constructor(public http: HttpClient, private sqlite: SQLite) { }

  public getDB() {
    return this.sqlite.create({
      name: 'siswiki.db',
      location: 'default'
    });
  }

  public createDataBase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        this.createTables(db);

        //this.insertDefaultItems(db);
      })
      .catch(e => console.log(e));
  }

  private createTables(db: SQLiteObject) {
    db.sqlBatch(["CREATE TABLE IF NOT EXISTS info (id INTEGER, usuario TEXT, perguntas TEXT)"])
      .then(() => console.log("Table created"))
      .catch(e => console.error("Error on creating the tables: ", e));
  }

  SetEmpregado(value) {
    return this.getDB()
      .then((db: SQLiteObject) => {
        return db.executeSql("UPDATE info SET usuario = ?  WHERE id=?", [value, 1])
          .catch((e) => console.log(e));
      })
  }

  Deslogar() {
    return this.getDB()
      .then((db: SQLiteObject) => {
        return db.executeSql("UPDATE info SET  usuario = ?, perguntas = ? WHERE id=?", ["{}", "[]", 1])
          .catch((e) => console.log(e));
      })
  }

  SetPerguntasAtivas(value) {
    return this.getDB()
      .then((db: SQLiteObject) => {
        return db.executeSql("UPDATE info SET perguntas = ?  WHERE id = ? ", [value, 1])
          .catch((e) => console.log(e));
      })
  }

}
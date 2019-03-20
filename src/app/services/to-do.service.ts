import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  toDoList: AngularFireList<any>;

  constructor(private _firebase: AngularFireDatabase) { }

  getList() {
    this.toDoList = this._firebase.list('title');
    return this.toDoList;
  }

  addTitle(title: string) {
    debugger;
    this.toDoList.push({
      title: title,
      isChecked: false
    });
  }

  checkOrUnCheckTitle($key: string, flag: boolean) {
    this.toDoList.update($key, { isChecked: flag });
  }

  removeTitle($key: string) {
    this.toDoList.remove($key);
  }

}

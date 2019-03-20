import { Component, OnInit } from '@angular/core';
import { ToDoService } from 'src/app/services/to-do.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {
  toDoArray: any[];

  constructor(private _toDoService: ToDoService) { }

  ngOnInit() {
    this._toDoService.getList().snapshotChanges()
    .subscribe(item => {
      this.toDoArray = [];
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['$key'] = element.key;
        this.toDoArray.push(x);
      });
      this.toDoArray.sort((a, b) => {
        return a.isChecked - b.isChecked;
      });
    });
  }

  add(itemTitle) {
    this._toDoService.addTitle(itemTitle.value);
    itemTitle.value = null;
  }

  check(key, checked) {
    this._toDoService.checkOrUnCheckTitle(key, !checked);
  }

  delete(key) {
    this._toDoService.removeTitle(key);
  }

}

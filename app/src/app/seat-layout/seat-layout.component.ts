import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-seat-layout',
  templateUrl: './seat-layout.component.html',
  styleUrls: ['./seat-layout.component.css']
})
export class SeatLayoutComponent implements OnInit {

  constructor(private service: DataService) {
  }

  ngOnInit(): void {
  }

  isActive: boolean = true;
  rows = [1, 2, 3];
  seats = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  limit: any;
  state = 2;
  checked = [];

  onClick() {

    //getData
    this.service.getData()
      .subscribe((res) => this.limit = res);
    var checkboxgroup = document.getElementById('seats').getElementsByTagName('input');
    console.log(checkboxgroup);
    for (var i = 0; i < checkboxgroup.length; i++) {

      var checkedcount = 0;
      for (var i = 0; i < checkboxgroup.length; i++) {
        checkedcount += (checkboxgroup[i].checked) ? 1 : 0;
      }
      if (checkedcount > this.limit) {
        console.log('You can select maximum of ' + this.limit + ' seats.');
        alert('You can select maximum of ' + this.limit + ' seats.');
        return false;
      }
    }

    var vCheckboxgroup = document.getElementById('seats').getElementsByTagName('input');

    for (var i = 0; i < vCheckboxgroup.length; i++) {

      if (vCheckboxgroup[i].checked === true) {
        this.checked.push(vCheckboxgroup[i].value);
        this.state = 0;
      }
    }
    console.log(this.checked);
    // for (var i = 0; i < this.checked.length; i++) {

    // }
  }

}

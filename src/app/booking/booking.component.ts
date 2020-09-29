import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../services/data.service';
// import { getTranslationDeclStmts } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  //form
  // count: any[];
  aChecked = [];
  aCross: any = [];
  isDisabled: boolean = false;

  //seatLayout
  isActive: boolean = true;
  rows: any[] = [];
  seats: any[] = [];
  // rows = [1, 2, 3];
  // seats = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  limit: any;
  state = 2;

  constructor(private service: DataService) { }
  form = new FormGroup({
    // username: new FormControl('', Validators.required),
    count: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.service.getDbData()
      .subscribe((res) => {
        console.log('seats ' + JSON.stringify(res));
        // for (var i in res) {
        this.rows = res[0].rows
        this.seats = res[1].seats
        // }
      })

    console.log(this.rows);
    console.log(this.seats);
    this.service.getSeats()
      .subscribe((res) => {
        for (var i in res) {
          this.aCross.push(res[i]);
        }
        console.log(res);
        console.log('aCross ' + this.aCross);
        this.resCheckbox();

        // this.aCross = res

      });
  }
  getUniqueSeats(aSeats) {
    const aResults = [];
    const map = new Map();
    for (const seat of aSeats) {
      if (!map.has(seat)) {
        map.set(seat, true);
        aResults.push(seat);
      }
    }
    return aResults;
  }

  resCheckbox() {
    var checkbox = document.getElementById('seats').getElementsByTagName('input');
    for (var i = 0; i < checkbox.length; i++) {
      for (var j = 0; j < this.aCross.length; j++) {
        if (checkbox[i].value == this.aCross[j]) {
          checkbox[i].disabled = true;
        }
      }
    }
  }
  onClick() {
    //getData
    this.limit = this.form.value.count;
    var checkboxgroup = document.getElementById('seats').getElementsByTagName('input');
    console.log(checkboxgroup);
    for (var i = 0; i < checkboxgroup.length; i++) {

      var checkedcount = 0;
      for (var i = 0; i < checkboxgroup.length; i++) {
        checkedcount += (checkboxgroup[i].checked) ? 1 : 0;
      }

      if (checkedcount > this.limit) {
        console.log('As per Number of Seats, select the seat');
        alert('As per Number of Seats, select the seat');
        return false;
      }
    }

    var vCheckboxgroup = document.getElementById('seats').getElementsByTagName('input');

    for (var i = 0; i < vCheckboxgroup.length; i++) {

      if (vCheckboxgroup[i].checked === true) {
        this.aChecked.push(vCheckboxgroup[i].value);
        // this.aChecked
        console.log(this.aChecked);
        // this.cart.selectedSeats.push(vCheckboxgroup[i].value);
        // this.cart.cartId += 1
        // this.state = 0;
      }
      this.aChecked = this.getUniqueSeats(this.aChecked);


      //   // for (var j = 0; j < this.aChecked.length; j++) {
      //   //   if (this.aChecked[j] = vCheckboxgroup[i].value) {
      //   //     this.isDisabled = true;
      //   //   }
      //   // }

    }

    // console.log(this.aChecked);


    // this.service.createBooking(JSON.stringify())
  }
  onSubmit() {
    var checkbox = document.getElementById('seats').getElementsByTagName('input');
    //TODO: if data null put condition data should not send to backend
    if (!this.form.get('username').value || !this.form.get('count').value) {
      this.fillDetails();
      return;
    } else {
      this.service.createBooking(JSON.stringify({ form: this.form.value, seats: this.aChecked }))
        .subscribe(response => {
          console.log('this.mData ' + JSON.stringify({ form: this.form.value, seats: this.aChecked }));
          alert('Submitted');
        });
      //form reset
      this.form.reset();
      // var checkbox = document.getElementById('seats').getElementsByTagName('input');
      for (var i = 0; i < checkbox.length; i++) {
        checkbox[i].checked = false;
        this.aChecked = [];
      }
      return;
    }

  }

  fillDetails() {
    this.form.setErrors({
      invalidLogin: true
    })
    // alert('Please fill the details')
  }

  reset() {
    this.form.reset();
    var checkbox = document.getElementById('seats').getElementsByTagName('input');
    for (var i = 0; i < checkbox.length; i++) {
      checkbox[i].checked = false;
      this.aChecked = [];

    }
  }
}

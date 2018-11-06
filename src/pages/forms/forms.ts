import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {BookingProvider} from "../../providers/booking/booking";
import {BookingEntry} from "../../models/booking-entry";

/**
 * Generated class for the FormsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forms',
  templateUrl: 'forms.html',
})
export class FormsPage {

  allCategories: any[] = [
    {id: 1, name: 'Haustier'},
    {id: 2, name: 'Auto'},
    {id: 3, name: 'Essen'},
    {id: 4, name: 'Trinken'},
    {id: 5, name: 'Kinder'},
    {id: 6, name: 'Bier'}
    ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public bookingProvider: BookingProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormsPage');
  }
  
  onSubmit(myForm: NgForm) {
    this.bookingProvider.addBookingEntry(
      new BookingEntry(
        undefined,
        'accout1key',
        myForm.form.controls.date.value,
        myForm.form.controls.comment.value,
        myForm.form.controls.amount.value,
        myForm.form.controls.categories.value
      )
    );


    console.log(myForm);
  }

}

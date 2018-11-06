import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BookingEntry} from "../../models/booking-entry";

/*
  Generated class for the BookingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BookingProvider {

  bookingEntries: BookingEntry[] = [];

  constructor(public http: HttpClient) {
    console.log('Hello BookingProvider Provider');
  }

  addBookingEntry(bookingEntry: BookingEntry) {
    this.bookingEntries.push(bookingEntry);
    console.log(this.bookingEntries);
  }

  removeBookingEntry(id: string) {

  }

  editBookingEntry(id: string){

  }

  getBookingEntries(accountId: string): BookingEntry[] {
    return this.bookingEntries;
  }

}

import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {PersonProvider} from "../../providers/person/person";
import {Person} from "../../models/person";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MyApp} from "../../app/app.component";
import {Camera} from "@ionic-native/camera";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public personForm: FormGroup;
  //public personList: Array<any>;
  public personList: Person[];
  public personPicture: string = null;

  constructor(
    public navCtrl: NavController,
    public personProvider: PersonProvider,
    formBuilder: FormBuilder,
    public camera: Camera) {
    //myConfig.set('monthShortNames', moment.monthsShort());

    this.personForm = formBuilder.group({
      personName: [
        '',
        Validators.compose([Validators.required])
      ],
      birthday: [
        '',
        Validators.compose([Validators.required])
      ],
      amount: [
        '',
        Validators.compose([Validators.required])
      ]
    });
    MyApp
  }

  ionViewDidLoad() {
    this.personProvider.getPersonList().on("value", personListSnapshot => {
      this.personList = [];
      personListSnapshot.forEach(personSnapshot => {
        console.log(personSnapshot.val().name + ' ' + personSnapshot.val().amount);
        this.personList.push(
          new Person(
            personSnapshot.key,
            personSnapshot.val().name,
            personSnapshot.val().birthday,
            personSnapshot.val().amount,
            personSnapshot.val().pictureUrl)
        );
      });
      this.personList = this.personList.sort(
        function (a, b) {
          if (a.birthday < b.birthday) return 1;
          if (a.birthday > b.birthday) return -1;
          return 0;
        }
      );
      console.log(this.personList);
    });
  }

  createPersonWithBirthday() {
    if (!this.personForm.valid) {
      console.log(
        `Form is not valid yet, current value: ${this.personForm.value}`
      );
    } else {
      this.personProvider
        .createPerson(
          this.personForm.value.personName,
          this.personForm.value.birthday,
          this.personForm.value.amount,
          this.personPicture)
        .then((newPerson) => {
          this.personForm.reset();
        });
    }
  }

  // this Function trigger the device Camera
  takePicture(): void {
    this.camera.getPicture({
      quality: 95,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: this.camera.EncodingType.PNG,
      saveToPhotoAlbum: true
    }).then(
      imageData => {
        // response from image picker
        this.personPicture = imageData;
      },
      error => {
        // error handling
        console.log('Error', JSON.stringify(error));
      }
    )
  }
}

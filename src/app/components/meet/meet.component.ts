import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {debounceTime, distinctUntilChanged, forkJoin, map, Observable, startWith, switchMap} from "rxjs";
import {formatDate} from "@angular/common";
import {LocationsApiModel} from "../../Model/LocationsApiModel";
import {ApiService} from "../../services/api.service";
import {Connection, ConnectionApiModel, PairedConnection} from "../../Model/ConnectionApiModel";

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.css']
})
export class MeetComponent {
  from1FormControl = new FormControl("");
  from2FormControl = new FormControl("");
  toFormControl = new FormControl("");

  optionsFrom: Observable<string[]> = new Observable<string[]>();
  optionsTo: Observable<string[]> = new Observable<string[]>();

  staticOptions: string[] = ['Basel', 'Bern', 'Luzern'];

  date: Date = new Date();
  time: string = "";

  ngOnInit() {
    this.time = formatDate(new Date(), 'hh:mm', 'en-US')

    // Read Data from Local Storage
    if (localStorage.getItem("searchFrom") && localStorage.getItem("searchTo")) {
      this.from1FormControl = new FormControl(localStorage.getItem("searchFrom"));
      this.toFormControl = new FormControl(localStorage.getItem("searchTo"));
      this.searchConnection()
    }

    // Autocomplete from1
    this.optionsFrom = this.from1FormControl.valueChanges.pipe(
      startWith(this.from1FormControl.value),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((newValue) =>
        !newValue || newValue.length < 2
          ? []
          : this.apiService.autoComplete(newValue)
      ),
      map((response: LocationsApiModel) => response.stations.map(station => station.name))
    );

    // Autocomplete from2
    this.optionsFrom = this.from2FormControl.valueChanges.pipe(
      startWith(this.from2FormControl.value),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((newValue) =>
        !newValue || newValue.length < 2
          ? []
          : this.apiService.autoComplete(newValue)
      ),
      map((response: LocationsApiModel) => response.stations.map(station => station.name))
    );

    // Autocomplete to
    this.optionsTo = this.toFormControl.valueChanges.pipe(
      startWith(this.toFormControl.value),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((newValue) =>
        !newValue || newValue.length < 2
          ? []
          : this.apiService.autoComplete(newValue)
      ),
      map((response: LocationsApiModel) => response.stations.map(station => station.name))
    );
  }


  constructor(private apiService: ApiService,
  ) {
  }

  connections: PairedConnection[] = [];
  isLoading: boolean = false;

  searchedFrom1: string = "";
  searchedFrom2: string = "";
  searchedTo: string = "";

  earliestPage = 0;
  newestPage = 0;

  searchConnection() {
    if (this.from1FormControl.value && this.from2FormControl.value && this.toFormControl.value) { // Validate input
      this.searchedFrom1 = <string>this.from1FormControl.value;
      this.searchedFrom2 = <string>this.from2FormControl.value;
      this.searchedTo = <string>this.toFormControl.value;
      localStorage.setItem('searchFrom', this.searchedFrom1);
      localStorage.setItem('searchTo', this.searchedTo);

      this.connections = [];
      this.isLoading = true;
      let connections1Obs: Observable<ConnectionApiModel> = this.apiService.getConnection(this.searchedFrom1, this.searchedTo, 0, this.date, this.time);
      let connections2Obs: Observable<ConnectionApiModel> = this.apiService.getConnection(this.searchedFrom2, this.searchedTo, 0, this.date, this.time);

      forkJoin([connections1Obs, connections2Obs]).subscribe(([c1, c2]) => {

        c1.connections.forEach(con1 => {
          con1.sections.forEach(section1 => {
            c2.connections.forEach(con2 => {
              con2.sections.forEach(section2 => {
                if (section1.journey.name == section2.journey.name) {

                  let pair: PairedConnection = {con1, con2};

                  this.connections.push(pair);
                }
              })
            });
          })
        });
        this.isLoading = false;
        console.log(this.connections);
      });
    }
  }
}

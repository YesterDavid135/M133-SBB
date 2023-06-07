import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Connection} from "../../Model/ConnectionApiModel";
import {debounceTime, distinctUntilChanged, map, Observable, startWith, switchMap} from "rxjs";
import {FormControl} from "@angular/forms";
import {LocationsApiModel} from "../../Model/LocationsApiModel";


@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})

export class ConnectionComponent implements OnInit {

  fromFormControl = new FormControl('');
  toFormControl = new FormControl('');

  optionsFrom: Observable<string[]> = new Observable<string[]>();
  optionsTo: Observable<string[]> = new Observable<string[]>();

  staticOptions: string[] = ['Basel', 'Bern', 'Luzern'];

  ngOnInit() {
    this.optionsFrom = this.fromFormControl.valueChanges.pipe(
      startWith(this.fromFormControl.value),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((newValue) =>
        !newValue || newValue.length < 2
          ? []
          : this.apiService.autoComplete(newValue)
      ),
      map((response: LocationsApiModel) => response.stations.map(station => station.name))
    );

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


  constructor(private apiService: ApiService) {
  }

  connections: Connection[] | null = null;
  isLoading: boolean = false;

  searchedFrom: string = "";
  searchedTo: string = "";

  earliestPage = 0;
  newestPage = 0;

  searchConnection() {
    if (this.fromFormControl.value && this.toFormControl.value) {
      this.searchedFrom = this.fromFormControl.value;

      this.searchedTo = this.toFormControl.value;
      this.connections = null;
      this.isLoading = true;
      this.apiService.getConnection(this.searchedFrom, this.searchedTo, 0).subscribe(data => {
        this.connections = data.connections;
        console.log(data.connections);
        this.isLoading = false
      });
    }
  }

  loadEarlier() {
    this.isLoading = true;
    if (this.connections != null)
      this.apiService.getConnection(this.searchedFrom, this.searchedTo, --this.earliestPage).subscribe(data => {
        // @ts-ignore
        this.connections = data.connections.concat(this.connections);
        console.log(this.connections);
        this.isLoading = false
      });
  }

  loadLater() {
    this.isLoading = true;
    if (this.connections != null)
      this.apiService.getConnection(this.searchedFrom, this.searchedTo, ++this.newestPage).subscribe(data => {
        // @ts-ignore
        this.connections = this.connections.concat(data.connections);
        console.log(this.connections);
        this.isLoading = false
      });
  }

  getIcon(connection: Connection) {
    if (connection.from.platform) {
      if (connection.from.platform.match(/\d/)) { // @ts-ignore
        return "picto:tracks-" + connection.from.platform.match(/\d+/)[0] + "-de-small";
      }
      if (connection.from.platform.match(/[a-zA-Z]/)) { // @ts-ignore
        return "picto:stands-" + connection.from.platform.toLowerCase() + "-de-small";
      }

    }
    if (connection.sections[0].journey && connection.sections[0].journey.category) {
      let category = connection.sections[0].journey.category
      if (category == "B")
        return "picto:bus-right"
      if (category == "T")
        return "picto:tram-right"
    }
    return "picto:accessible-right-framed";
  }


}

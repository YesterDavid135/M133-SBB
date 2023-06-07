import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Connection} from "../../Model/ConnectionApiModel";


@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})

export class ConnectionComponent implements OnInit {
  ngOnInit() {
  }


  constructor(private apiService: ApiService) {
  }

  searchFrom: string = "";
  searchTo: string = "";

  connections: Connection[] | null = null;
  isLoading: boolean = false;

  searchedFrom: string = "";
  searchedTo: string = "";

  earliestPage = 0;
  newestPage = 0;

  searchConnection() {
    this.searchedFrom = this.searchFrom
    this.searchedTo = this.searchTo
    this.connections = null;
    this.isLoading = true;
    this.apiService.getConnection(this.searchedFrom, this.searchedTo, 0).subscribe(data => {
      this.connections = data.connections;
      console.log(data.connections);
      this.isLoading = false
    });
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

  autoCompleteFrom() {

  }
}

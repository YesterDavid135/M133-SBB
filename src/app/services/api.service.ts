import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ConnectionApiModel} from "../Model/ConnectionApiModel";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  public autoComplete(input: string) {
    let url = "https://transport.opendata.ch/v1/locations?query=" + input;

    return this.http.get<any>(url);

  }

  getConnection(from: string, to: string, page: number, date: Date, time: string) {

    let dateString = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

    let url = "http://transport.opendata.ch/v1/connections"
      + "?from=" + from
      + "&to=" + to
      + "&page=" + page
      + "&date=" + dateString
      + "&time=" + time;


    return this.http.get<ConnectionApiModel>(url);

  }
}

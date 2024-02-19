import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ConnectionComponent} from "./components/connection/connection.component";
import {MeetComponent} from "./components/meet/meet.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'connection', component: ConnectionComponent},
  {path: 'meet', component: MeetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

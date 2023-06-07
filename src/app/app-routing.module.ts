import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ConnectionComponent} from "./components/connection/connection.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'connection', component: ConnectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

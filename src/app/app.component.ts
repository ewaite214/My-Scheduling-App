import {Component, ViewChild} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import { MyService } from './services/my-service.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    // ViewChild is a method that allows you 
    // to get a html element from your html page
 @ViewChild('snav') snav: MatSidenav;
 
 constructor(
    private ms: MyService
    ) {   }
 
    close() {
        this.snav.close();
    }
}

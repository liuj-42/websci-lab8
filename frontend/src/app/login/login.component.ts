import { Component, ViewChild, OnInit } from '@angular/core';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  ngOnInit(): void {
    console.log("checking")
    if (!(searchParams.has("logged_in"))) {
      console.log("not logged in")
      this.showModal();
    }
    if(searchParams.has("error")) {
      console.log("error, redirected")
      this.showModal();
    }
  }

  @ViewChild('autoShownModal', { static: false }) autoShownModal?: ModalDirective;
  isModalShown = false;
 
  showModal(): void {
    this.isModalShown = true;
  }
 
  hideModal(): void {
    this.autoShownModal?.hide();
  }
 
  onHidden(): void {
    this.isModalShown = false;
  }

}

let searchParams = new URLSearchParams(window.location.search);


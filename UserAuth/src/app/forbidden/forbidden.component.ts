import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../service/user-auth.service';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.css']
})
export class ForbiddenComponent implements OnInit {

  constructor(
    public _auth: UserAuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }

  public logoutClicked() {
    this._auth.logout();
    this._router.navigateByUrl('/login');
  }
}

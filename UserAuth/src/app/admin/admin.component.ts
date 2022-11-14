import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { __read } from 'tslib';
import { UserData } from '../model/UserData';
import { DataService } from '../service/data.service';
import { UserAuthService } from '../service/user-auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  public data: Observable<UserData>;

  constructor(
    public _auth: UserAuthService,
    _dataService: DataService,
    private _router: Router
  ) { this.data = _dataService.getAdminData() }

  ngOnInit(): void {
  }

  public logoutClicked() {
    this._auth.logout();
    this._router.navigateByUrl('/login');
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserData } from '../model/UserData';
import { DataService } from '../service/data.service';
import { UserAuthService } from '../service/user-auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public data: Observable<UserData>;

  constructor(
    public _auth: UserAuthService,
    _dataService: DataService,
    private _router: Router
  ) { this.data = _dataService.getUserData() }

  ngOnInit(): void {
  }

  public logoutClicked() {
    this._auth.logout()
    this._router.navigateByUrl('/login')
  }

}

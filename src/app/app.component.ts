import { UserService } from './services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'interview-front';
  users: [] = [];

  constructor(private userService: UserService) {
    userService.getFromInternet().subscribe((res: any) => {
      console.log(res, 'data');
      this.userService.list().subscribe((user: any) => {
        if (user['status'] == 'error') {
          res.forEach((currentUser: {}) => {
            this.userService.add(currentUser).subscribe(res => {
              this.users = user['user']
              console.log(res, 'ha sido agregado');
            });
          });
        } else {
          this.users = user['users']
          console.log(this.users, 'usuarios del back');
        }
      })
    });
  }

  list() {
    this.userService.list().subscribe((res: any) => {
      this.users = res['users'];
      console.log(res);
    })
  }

  delete(id: number) {
    this.userService.delete(id).subscribe(res => {
      console.log(res, 'delete');
      this.list()
    });
  }

  put(id: number) {
    this.userService.update(id, { id: Math.random(), name: 'carlos', username: 'carlosrodri', email: 'c@f', address: { city: 'tunja' } }).subscribe(res => {
      console.log(res);
      this.list()
    })
  }

  add() {
    let user = { id: Math.random(), name: 'Nuevo usuario', username: 'newUser', email: 'newUser@f', address: { city: 'tunja' } }
    this.userService.add(user).subscribe(res => {
      alert('usuario ' + user.id + ' agregado')
      this.list()
    })
  }
}

import { UserService } from './../../../services/user.service';
import { UserEnum, PutUserData,User } from './../../../formatters/formatter';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  per_page:number = 2;
  users?: User[] | undefined;
  table_headers: string[] = [];
  userEnum = UserEnum;

  constructor(private service: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.service.getUsers(this.per_page).subscribe((res)=>{
      this.users = res.data
      this.table_headers = Object.values(UserEnum)
    })
  }

  getPagesList(){
    return [2,5,10,15,20]
  }

  deleteUser(id: number, event: any){
    const detail:string = 
    `User Deleted\nName: ${this.users![id-1].first_name} ${this.users![id-1].last_name} \nEmail Id: ${this.users![id-1].email}`;
    this.service.deleteUser(id).subscribe((res)=>{ console.log("User Deleted.", detail) })
    alert(detail)
    // console.log(event)
    // console.log(event.target)
    // console.log(event.target.closest("tr"))
    event.target.closest("tr").remove()
  }

  updateUser(id: number){
    const postData: PutUserData = {
      first_name: "Name",
      last_name: "Surname",
      email: "new_email@gmil.com"
    }
    this.service.updateUser(id, postData).subscribe((res)=>{ console.log("User Updated.", res) })
    this.users![id-1].first_name = postData.first_name;
    this.users![id-1].last_name = postData.last_name;
    this.users![id-1].email = postData.email;
    const detail:string = 
    `User Updated\nName: ${postData.first_name} ${postData.last_name} \nEmail Id: ${postData.email}`;
    alert(detail)
  }
}
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
  users?: User[] | undefined; // array of objects of type User(defined in formatters/formatter.ts)
  table_headers: string[] = [];
  userEnum = UserEnum;

  constructor(private service: UserService) { }

  // on initalizing calls the loadUser method 
  ngOnInit(): void {
    this.loadUsers();
  }

  // calls the getUsers method of UserService and passes the per page user value
  loadUsers(){
    this.service.getUsers(this.per_page).subscribe((res)=>{
      // assigns the res.data(which is the array of users) from the API to users array
      this.users = res.data

      // from UserEnum selects the header title which are to be shown in front-end 
      // and assigns them to table_headers array, which is used in html for creating the table header
      this.table_headers = Object.values(UserEnum)
    })
  }

  // provides a per_page value in the html
  getPagesList(){
    return [2,5,10,15,20]
  }

  // called when the delete button is clicked in html
  deleteUser(id: number, event: any){
    // fetches the user data from the users array and puts it in below string template
    const detail:string = 
    `User Deleted\nName: ${this.users![id-1].first_name} ${this.users![id-1].last_name} \nEmail Id: ${this.users![id-1].email}`;

    // calls the deleteUser method of UserService
    this.service.deleteUser(id).subscribe((res)=>{ console.log("User Deleted.", detail) })

    // shows the detail of the deleted user in the alert box
    alert(detail)

    // removes the element from the html
    event.target.closest("tr").remove()
  }

  updateUser(id: number){
    // the new details of the user will be put in this postData object after fetching it from the front-end
    // for now hard coded
    const postData: PutUserData = {
      first_name: "Name",
      last_name: "Surname",
      email: "new_email@gmil.com"
    }

    // calls the updateUser method of UserService
    this.service.updateUser(id, postData).subscribe((res)=>{ console.log("User Updated.", res) })

    // following lines changes the data shown in the front-end for the selected user
    this.users![id-1].first_name = postData.first_name;
    this.users![id-1].last_name = postData.last_name;
    this.users![id-1].email = postData.email;

    // fetches the user data from the users array and puts it in below string template
    const detail:string = 
    `User Updated\nName: ${postData.first_name} ${postData.last_name} \nEmail Id: ${postData.email}`;

    // shows the detail of the updated user in the alert box
    alert(detail)
  }
}
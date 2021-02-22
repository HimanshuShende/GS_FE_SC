// the User object fetched from the https://reqres.in are of this format
export interface User {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
}

// the Response from the https://reqres.in/api/users is of this format
export interface ReqRes {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: User[]
}

// can be modified to show/hide the table headers in the front-end, HTML munst be changed accordingly to show the details per row
// this also defines the order in which the columns are shown
export enum UserEnum{
    avatar = "avatar",
    first_name = "first name",
    last_name = "last name",
    email = "email",
    action = "actions"
    // id = "id",
}

// interface for the postData to be sent to the PUT request for updating user details
export interface PutUserData{
    first_name: string,
    last_name: string,
    email: string
}
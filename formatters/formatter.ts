
export interface User {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
}

export interface ReqRes {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: User[]
}

export enum UserEnum{
    avatar = "avatar",
    first_name = "first name",
    last_name = "last name",
    email = "email",
    action = "actions"
    // id = "id",
}


export interface PutUserData{
    first_name: string,
    last_name: string,
    email: string
}
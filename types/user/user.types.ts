export type NewUserType = {
    username: string;
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    isAdmin: boolean,
    favorite_places: string[],
}

export interface UserType extends NewUserType {
    createdAt: Date,
    updateAt: Date,
}
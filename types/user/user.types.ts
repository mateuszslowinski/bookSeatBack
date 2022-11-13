export type UserType = {
    username: string;
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    isAdmin: boolean,
    favorite_places: string[],
    createdAt: Date;
    updateAt: Date;
}
export type RestaurantType = {
    name: string,
    available_seats: number,
    address: {
        street: string,
        building_number: string,
        zip_code: string,
        city: string,
    }
    image: string,
    createdAt: Date;
    updateAt: Date;
}
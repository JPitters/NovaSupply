export interface User {
    id?:string;
    FirstName?:string;
    Email?:string;
    LastName?:string;
    Address?:string;
    City?:string;
    Province?:string;
    Country?:string;
    PostalCode?:string;
    PhoneNumber?:string;
    bAddress?:string;
    bCity?:string;
    bProvince?:string;
    bCountry?:string;
    bPostalCode?:string;
    bPhoneNumber?:string;
    Cart?: Array<CartItem>;
    admin: boolean;
}

export interface CartItem {
    ProdID?:string;
    Name?:string;
    URL?:string;
    Category?:string;
    Size?:string;
    Price?:number;
    Quantity?: number;
    TPrice?:number;
}

export interface Order {
    uid?:string;
    OItems?: Array<CartItem>;
    Status?:string;
    Done?:boolean;
    
    FirstName?:string;
    Email?:string;
    LastName?:string;
    Address?:string;
    City?:string;
    Province?:string;
    Country?:string;
    PostalCode?:string;
    PhoneNumber?:string;
    bAddress?:string;
    bCity?:string;
    bProvince?:string;
    bCountry?:string;
    bPostalCode?:string;
    bPhoneNumber?:string;
    
    //Order Sent, Working on Order, Order Shipped, Order Delivered
}
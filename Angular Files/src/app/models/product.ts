export interface Product {
    id?:string;
    Name?:string;
    Price?:number;
    Details?:string;
    Fabric?:string;
    Description?:string;
    Sizes?:Array<string>;
    Stock?:Array<number>;
    Category?: string;
    URL?:string;
    Collection?:string;
}


export interface Category {
    Headwear?:string;
    Shirts?:string;
    Pants?:string;
    Male?:string;
    Female?:string;
}

export class Order{
    constructor(public field: string = "Name", public order: string = "asc") {

    }
}

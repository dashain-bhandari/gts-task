export interface Product{
    id:number;
    name: string;
    price: number;
    weight: number;
}

export interface Order{
    items:string[];
    price:number;
    weight:number;
    courierPrice:number;
}
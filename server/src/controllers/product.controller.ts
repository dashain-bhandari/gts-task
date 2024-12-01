import { NextFunction, Request, Response } from "express";
import { products } from "../data/product";
import { courierCharges } from "../data/courierCharges";

// get all products
export function getAllProductsHandler(req: Request, res: Response) {
    let productsArray = Object.entries(products).map(([id, product]) => ({
        id: Number(id),  
        ...product,     
      }));
    res.status(201).json({
        status: "success",
        data: productsArray
    })
    return;
}


// get courier charges
export function getCourierChargesHandler(req: Request, res: Response) {
    res.status(201).json({
        status: "success",
        data: courierCharges
    })
    return;
}




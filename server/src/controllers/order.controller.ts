import { NextFunction, Request, Response } from "express";
import { products } from "../data/product";
import { courierCharges } from "../data/courierCharges";
import { checkIfPackagingRequired, confirmOrderWithoutDivision, divideItemsIntoPackages } from "../helpers/helper";


// create order
export function createOrderHandler(req: Request, res: Response) {
  let ids = req.body.ids;
  let packages;
  if (checkIfPackagingRequired(ids)) {
    packages = divideItemsIntoPackages(ids);
  }
  else {
packages=confirmOrderWithoutDivision(ids)
  }

  res.status(201).json({
    status: "success",
    data: packages
  })
}







import { products } from "../data/product";


interface Package {
    items: any[]
    weight: number
    price: number
    courierPrice: number
}

// in case of packaging required, use without equal to sign because more can be adjusted into same package
const getFittingPackageForWeight = (weight: number) => {
    if (weight < 200) {
        return "0-200"
    }
    else if (weight < 500) {
        return "200-500"
    }

    else if (weight < 1000) {
        return "500-1000"
    }
    else {
        return "1000-5000"
    }
}

// when packaging not required, use equals to , so bigger weight package is avoided when not required.
const getPackageForTotalWeight = (weight: number) => {
    if (weight <= 200) {
        return "0-200"
    }
    else if (weight <= 500) {
        return "200-500"
    }

    else if (weight <= 1000) {
        return "500-1000"
    }
    else {
        return "1000-5000"
    }
}

const calculateCourierPriceForPkg = (pkgName: string) => {
    if (pkgName == "0-200") {
        return 5
    }
    else if (pkgName == "200-500") {
        return 10
    }

    else if (pkgName == "500-1000") {
        return 15
    }
    else {
        return 20
    }
}



export const checkIfPackagingRequired = (ids: number[]) => {
    let sum = 0
    ids.forEach((i) => {
        sum += products[i].price
    })
    if (sum > 250) {
        return true
    }
    else {
        return false
    }
}

const findTotalWeightOfOrder = (ids: number[]) => {
    let sum = 0
    ids.forEach((i) => {
        sum += products[i].weight
    })
    return sum
}

export const confirmOrderWithoutDivision = (ids: number[]) => {
    let order = [];
    let totalWeight = findTotalWeightOfOrder(ids);
    let packageKey = getPackageForTotalWeight(totalWeight);
    let items: string[] = []
    let price = 0
    let weight = 0
    let courierPrice = 0
    ids.forEach((i) => {
        items.push(products[i].name)
        weight += products[i].weight
        price += products[i].price
        courierPrice = calculateCourierPriceForPkg(packageKey)
    })
    order.push(
        {
            items,
            price,
            weight,
            courierPrice
        }
    )
    return order
}

export const divideItemsIntoPackages = (ids: number[]) => {
    let packages: Record<string, Package>[] = [];
    ids.sort((a, b) => products[b].weight - products[a].weight);
    ids.forEach((item, index) => {


        //search among existing packages if any pkg can fit the item
        let fitPkg = packages.findIndex((pkg) =>
            Object.keys(pkg).some((key) => {
                const maxWeight = parseInt(key.split("-")[1]);
                return (
                    pkg[key].price + products[item].price <= 250 &&
                    pkg[key].weight + products[item].weight <= maxWeight
                );
            })
        );
        if (fitPkg !== -1) {
            // extract key of that package index
            let key = Object.keys(packages[fitPkg]).find((key) => {
                const maxWeight = parseInt(key.split("-")[1]);
                return (
                    packages[fitPkg][key].price + products[item].price <= 250 &&
                    packages[fitPkg][key].weight + products[item].weight <= maxWeight
                );
            });

            if (key) {
                packages[fitPkg][key].items.push(products[item].name)
                packages[fitPkg][key].weight += products[item].weight
                packages[fitPkg][key].price += products[item].price
            }
        }
        else {
            // create new package 
            let packageKey = getFittingPackageForWeight(products[item].weight)
            packages.push({
                [packageKey]: {
                    items: [products[item].name],
                    price: products[item].price,
                    weight: products[item].weight,
                    courierPrice: calculateCourierPriceForPkg(packageKey)
                }
            })
        }




    })
    
    // to format output in desired form
    return packages.map(pkg => {
        const key = Object.keys(pkg)[0];
        return pkg[key];
    });
   
}


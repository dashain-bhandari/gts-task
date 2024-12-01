import React from 'react'
import { Order } from '../types/types'

function PackageItem({ item, index }: { item: Order, index: number }) {
    return (
        <>
            <div className='mb-4'>
                <div className='text-gray-800 text-xl font-bold sm:text-2xl '>Package {index + 1}</div>
                <div>Items: {
                    item.items.map((i: string, index: number) => {
                        return `${i}${index == item.items.length - 1 ? "" : ", "}`
                    })
                }
                </div>

                <div>
                    Total Weight : {item.weight}g
                </div>
                <div>
                    Total Price : ${item.price}
                </div>
                <div>
                    Courier price : ${item.courierPrice}
                </div>
            </div>
        </>
    )
}

export default PackageItem
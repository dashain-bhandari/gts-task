import React from 'react'
import PackageItem from './PackageItem'
import { Order } from '../types/types'

function AllPackages({ order }: { order: Order[] | [] }) {
    return (
        <div className='ml-8'>
            <div className='text-gray-800 text-xl font-bold sm:text-2xl'>Your order is:</div>
            {
                order.map((item: Order,index:number) => {
                    return <PackageItem item={item} index={index} />
                })
            }
        </div>

    )
}

export default AllPackages
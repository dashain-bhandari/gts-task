import { useEffect, useState } from 'react'

import './App.css'
import { Order, Product } from './types/types'
import { AxiosInstance } from './config/AxiosInstance'
import AllPackages from './components/AllPackages'

function App() {

  const [items, setItems] = useState<Product[] | null>(null)
  const [order, setOrder] = useState<Order[]|null>(null)
  const [loading, setLoading] = useState(false);
  const [itemList, setItemList] = useState<Product[] | []>([])

  useEffect(() => {
    const getAllItems = async () => {
      try {
        const { data } = await AxiosInstance.get("/products");
        console.log(data)
        if (data.data) {
          setItems(data.data)
        }
      } catch (error: any) {
        console.log("Error fetching data", error.message)
      }
    }
    getAllItems()
  }, [])

  const onCheckedChange = (item: Product) => {
    if (itemList.find((i) => item.id == i.id)) {
      const newItemList = itemList.filter((i) => i.id !== item.id)
      setItemList(newItemList)
    }
    else {
      setItemList(
        (prev) => {
          return [...prev,
            item
          ]
        }
      )
    }
  }

  const onPlaceOrder = async () => {
    try {
      setLoading(true)
      const ids = itemList.map((item) => {
        return item.id
      })
      const { data } = await AxiosInstance.post("/orders", {
        ids: ids
      })
      if (data.data) {
        console.log(data.data)
        setOrder(data.data)
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      console.log("Error placing order", error.message)
    }
  }
  return (
    <div className=" flex">


      <div className="w-full pt-12  pb-20">
        {
          loading ? (

            <div>
              Your order is being processed
            </div>

          ) : (
            <>
              {
                order ? (<>
                  <AllPackages order={order}/>
                </>) : (
                  <div className="w-full mx-auto px-4 md:px-8">
                    <div className=" flex items-center justify-between">
                      <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">All Items</h3>

                    </div>
                    <div className="mt-12 max-h-[600px] shadow-sm border rounded-lg overflow-x-auto overflow-y-scroll">
                      <table className="w-full table-auto text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                          <tr>
                            <th className="py-3 px-6 whitespace-nowrap">S.N</th>
                            <th className="py-3 px-6 whitespace-nowrap">Name</th>
                            <th className="py-3 px-6 whitespace-nowrap">Price</th>
                            <th className="py-3 px-6 whitespace-nowrap">Weight</th>

                          </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                          {items?.map((item, idx) => (
                            <tr key={idx}>
                              <td className="px-6 py-4 whitespace-nowrap">{idx + 1}.</td>
                              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {item.price}
                              </td>

                              <td className=" px-6 whitespace-nowrap space-x-2">


                                {item.weight}

                              </td>

                              <td className=" px-6 whitespace-nowrap space-x-2">


                                <input type='checkbox' onChange={() => onCheckedChange(item)} checked={itemList.some((i) => i.id == item.id)} ></input>

                              </td>
                            </tr>
                          ))}


                        </tbody>
                      </table>
                    </div>
                    <button
                      onClick={onPlaceOrder}
                      className='bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md text-white mt-4 '>
                      Place Order
                    </button>
                  </div>
                )
              }
            </>
          )
        }
      </div>
    </div>
  )
}

export default App

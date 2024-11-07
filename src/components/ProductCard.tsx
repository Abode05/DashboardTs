import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { RiDeleteBin6Line } from "react-icons/ri"
import { Link, useNavigate } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import ConfirmModal from "./ConfirmModal"
import {Context} from '../App'

interface productObj {
  id:number
  name: string
  price: number
  image_url: string
}
const ProductCard = () => {
  const { SearchFilter } = useContext(Context)

  const [Products, setProducts] = useState<productObj[]>([])
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [filter, setFilter] = useState<productObj[]>([])
    const navigate=useNavigate()

  /////fetch products
  useEffect(() => {
    const token = localStorage.getItem('token')
    axios
      .get<productObj[]>('https://vica.website/api/items', {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProducts(res.data)
        setFilter(res.data)
        
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          navigate('/auth') // Redirect to login on unauthorized
        } else {
          console.log(error)
          toast.error('Failed to fetch products')
        }
      })
  }, [navigate])
  ////// 
      useEffect(() => {
        setFilter(
          Products.filter((product) =>
            product.name.toLowerCase().includes(SearchFilter.toLowerCase())
          )
        )
      }, [SearchFilter, Products])
    ///////handle delete 
    const handleDeleteClick = (productId:number) => {
        setSelectedProductId(productId)
        setIsModalOpen(true)
    }

    const confirmDelete = (productId?: number|null) => {
      if (productId === null) return // تحقق من عدم وجود null

      const token = localStorage.getItem('token')
      axios
        .delete(`https://vica.website/api/items/${productId}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
            setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
          )
          toast.success('Product deleted successfully')
          setTimeout(() => {
            navigate('/')
          }, 1500)
        })
        .catch((error) => {
          console.log(error)
          toast.error('Failed to delete product')
        })
        .finally(() => {
          setIsModalOpen(false)
        })
    }
    const closeModal = () => {
      setIsModalOpen(false)
    }
    ///////

  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-6  mt-6 w-full flex-col md:flex-row md:justify-center lg:justify-start">
        {filter.map((product) => (
          <div
            key={product.id}
            className="bg-white py-3 rounded-md px-6 shadow-md  dark:bg-dark-2"
          >
            <img
              src={product.image_url}
              alt=""
              className="w-48 h-48 text-center  "
            />
            <h1 className="text-2xl font-bold dark:text-gray-200">
              {product.name}
            </h1>
            <p className="text-blue-700 font-bold text-xl">{product.price}$</p>
            <div className="flex justify-between items-center mt-5">
              <Link
                to={`edit/${product.id}`}
                className="rounded-full bg-primary py-2 px-3 dark:bg-dark-3
                 dark:text-white hover:bg-primary/90 dark:hover:bg-dark-1 text-lg duration-200"
              >
                Edit Product
              </Link>
              <button onClick={() => handleDeleteClick(product.id)}>
                <RiDeleteBin6Line className="w-6 h-6 dark:text-white" />
              </button>
            </div>
          </div>
        ))}
        <ToastContainer />
      </div>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        productId={selectedProductId}
        title=" Are you sure you want to delete this product?"
      />
    </div>
  )
}

export default ProductCard
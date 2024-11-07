import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

interface InputType {
  type: string
  placeholder: string
  label: string
  name: string
}
interface DataForm {
  title: string
  inputs: Array<InputType>
  btn: string
}
interface Product {
  name: string
  price: string
  image: File | null
}

const FormCreate = ({ inputs, title, btn }: DataForm) => {
  const [product, setProduct] = useState<Product>({
    name: '',
    price: '',
    image: null,
  })
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleCreateProductClick = () => {
    fileInputRef.current?.click()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.currentTarget
    if (files && files.length > 0) {
      setProduct({ ...product, [name]: files[0] })
    } else {
      setProduct({ ...product, [name]: value })
    }
  }

  useEffect(() => {
    if (product.image) {
      const previewUrl = URL.createObjectURL(product.image)
      setImageUrl(previewUrl)
      return () => URL.revokeObjectURL(previewUrl)
    }
  }, [product.image])

  useEffect(() => {
    axios
      .get(`https://vica.website/api/items/${id}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setProduct({
          name: res.data.name,
          price: res.data.price,
          image: null,
        })
        setImageUrl(res.data.image_url)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [id, token])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const ids = toast.loading('Please wait...')

    try {
      if (btn === 'create') {
        const response = await axios.post(
          'https://vica.website/api/items',
          product,
          {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        console.log(response.data)
      }
      else {
        const data = { ...product, _method: 'PUT' }
        const res = await axios.post(
          `https://vica.website/api/items/${id}`,
          data,
          {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        )
        console.log(res.data)
      }
      toast.update(ids, {
        render: (btn=='create')?'success create':'success update product',
        type: 'success',
        isLoading: false,
        autoClose: 2500,
      })
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (error) {
      console.error(error)
      toast.error('Error in creating new product')
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4 dark:text-gray-200 text-dark-1 mt-16">
        {title}
      </h1>

      <form className="flex gap-8 mt-8" onSubmit={handleSubmit}>
        {/* Left side: Text inputs */}
        <div className="flex-1">
          {inputs.map((input, index) => (
            input.type !== 'file' && (
              <div key={index} className="flex flex-col max-w-lg mb-6">
                <label className="block text-lg font-medium text-subtitle mb-2 dark:text-gray-200">
                  {input.label}
                </label>
                <input
                  type={input.type}
                  placeholder={input.placeholder}
                  className="border p-3 w-full rounded-lg bg-primary h-11 dark:text-black"
                  name={input.name}
                  required
                  onChange={handleChange}
                  value={product[input.name as keyof Omit<Product, 'image'>] || ''}
                />
              </div>
            )
            
          ))}
          <button
            type="submit"
            className="bg-primary py-2 px-4 rounded-lg text-lg font-semibold "
          >
            {btn}
          </button>
        </div>

        {/* Right side: Image input */}
        <div className="flex-1 flex justify-center items-center border-2 border-dashed border-blue-500
         rounded-lg p-6">
          <label htmlFor="image" className="cursor-pointer text-center dark:text-white">
            <img
              src={imageUrl || '/assets/icons/upload.svg'}
              alt="Upload Preview"
              onClick={handleCreateProductClick}
              className="w-52 h-52 object-contain rounded cursor-pointer"
            />
            Upload Image
          </label>
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            name="image"
            
            onChange={handleChange}
          />
        </div>
      </form>
      
    </div>
  )
}
export default FormCreate

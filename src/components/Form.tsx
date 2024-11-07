import axios from 'axios'
import { ChangeEvent, FormEvent,  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface InputType {
  type: string
  placeholder: string
  label: string
  name: string
}

interface DataForm {
  title: string
  subtitle: string
  inputs: Array<InputType>
  btn: string
  api: string
  className: string
}

const Form = ({ title, subtitle, inputs, btn, api, className }: DataForm) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    '/assets/images/profile-avatar.png'
  )
  const navigate = useNavigate()

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImagePreview(imageUrl)
    }
    handleChange(e)
  }
  const initialUserData = inputs.reduce((acc, inputs) => {
    acc[inputs.name] = inputs.type === 'file' ? null : ''
    return acc
  }, {} as { [key: string]: string | File | null })

  //
  const [userData, setUserData] = useState(initialUserData)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.currentTarget
    if (files && files.length > 0) {
      setUserData({ ...userData, [name]: files[0] })
    } else {
      setUserData({ ...userData, [name]: value })
    }
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const ids = toast.loading('Please wait...')

    const formData = new FormData()
     Object.entries(userData).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value)
      }
    })
    console.log('Form Data:', ...formData)
    await axios
      .post(api, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((res) => {
      if (btn == 'Signin') {
       console.log(res.data.data.token)
       localStorage.setItem('token', res.data.data.token)
       localStorage.setItem('User', JSON.stringify(res.data.data.user))
        toast.update(ids, {
          render: (btn == 'Signin') ? 'success Register' : 'success Login',
          type: 'success',
          isLoading: false,
          autoClose: 2500,
        })
        setTimeout(() => {
          navigate('/')
        }, 2000)
        
        } else {
          console.log(res.data.token)
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('User', JSON.stringify(res.data.user))
        toast.update(ids, {
          render: (btn == 'Signin') ? 'success Register' : 'success Login',
          type: 'success',
          isLoading: false,
          autoClose: 2500,
        })
        setTimeout(() => {
          navigate('/')
        }, 2000)
        } 
      }
                      
      )
      .catch((error) => {
        console.log(error)
        toast.error(error.response.data.msg)
      })
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-bg_auth">
      <form
        className={`max-w-2xl bg-white px-6 py-6 rounded-xl shadow-lg flex flex-col `}
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold ">{title}</h1>
          <p className="text-md text-gray-600">{subtitle}</p>
        </div>
        <div className={className}>
          {inputs.map((input, index) => (
            <div
              key={index}
              className={` p-1 ${
                input.type === 'email' ? 'w-[calc(100%)]' : ''
              } ${input.type === 'file' ? 'w-[calc(100%)] ' : ''} ${
                input.type === 'password' && btn == 'Signin'
                  ? 'w-[calc(50%)] inline-block '
                  : ''
              }  `}
            >
              <label
                htmlFor={`input-${index}`}
                className="block font-semibold mb-1"
              >
                {input.label}
              </label>
              {input.type === 'file' ? (
                <label
                  htmlFor={`input-${index}`}
                  className="cursor-pointer block  "
                >
                  <img
                    src={imagePreview || '/assets/images/profile-avatar.png'}
                    alt="Profile"
                    className="h-24 w-24  rounded-full"
                  />
                  <input
                    type="file"
                    id={`input-${index}`}
                    name={input.name}
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              ) : (
                <input
                  type={input.type}
                  placeholder={input.placeholder}
                  id={`input-${index}`}
                  name={input.name}
                  onChange={handleChange}
                  className="border rounded-lg p-2 w-full bg-gray-100"
                />
              )}
            </div>
          ))}
        </div>
        <div className="text-center ">
          <button
            type="submit"
            className={`px-24 py-2 bg-blue-500 text-white rounded-lg
             hover:bg-blue-600 transition ${btn == 'login' ? 'mt-20' : ''}`}
          >
            {btn}
          </button>
          {btn.toLowerCase() === 'login' ? (
            <p className="mt-2 text-gray-600">
              Create an account?{' '}
              <Link to="signin" className="text-blue-500 underline">
                Sign Up
              </Link>
            </p>
          ) : (
            <p className="mt-2 text-gray-600">
              Already have an account?{' '}
              <Link to="/auth" className="text-blue-500 underline ">
                Login
              </Link>
            </p>
          )}
        </div>
      </form>
    </div>
  )
}

export default Form

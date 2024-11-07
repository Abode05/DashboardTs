import {  ToastContainer } from 'react-toastify'
import Form from '../../components/Form'
import { inputsLogin } from '../../constant/data'

const Login: React.FC = () => {
 
  return (
    <div className="">
      <Form
        title="Login to Account"
        subtitle=" Please enter your email and password to continue"
        inputs={inputsLogin}
        btn="login"
        api="https://vica.website/api/login"
        className=" w-full   "
      />
      <ToastContainer />
    </div>
  )
}
export default Login

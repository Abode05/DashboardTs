
import {ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Form from "../../components/Form"
import { inputs } from "../../constant/data"

const Signin = () => {    
  return (
    <>
      <Form
        title="Create an Account"
        subtitle="Sign up to continue"
        inputs={inputs}
        btn="Signin"
        api="https://vica.website/api/register"
        className={`flex flex-wrap`}
      />
      <ToastContainer />
    </>
  )
}
export default Signin
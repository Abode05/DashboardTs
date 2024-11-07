
import FormCreate from '../components/FormCreate'
import { inputCreate } from '../constant/data'
import { ToastContainer } from 'react-toastify'

const EditProduct = () => {
  return (
    <>
      <FormCreate
        title='update'
        inputs={inputCreate}
        btn="update"
      />
      <ToastContainer />
    </>
  )
}
export default EditProduct

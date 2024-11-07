
import FormCreate from '../components/FormCreate'
import { inputCreate } from '../constant/data'
import { ToastContainer } from 'react-toastify'

const CreateProduct = () => {
  return (
    <>
      <FormCreate
        title="create product"
        inputs={inputCreate}
        btn="create"

      />
      <ToastContainer />
    </>
  )
}

export default CreateProduct
// <div className="p-6">
//   <h1 className="text-3xl font-semibold mb-4 dark:text-gray-200 text-dark-1 mt-16">
//     Create Product
//   </h1>
//   <form
//     className="flex justify-between gap-16 md:flex-row flex-col"
//     onSubmit={handleCreate}
//   >
//     <div className="mb-4">
//       <label className="flex flex-col text-xl text-subtitle mb-4 dark:text-gray-200 gap-2">
//         Name Product:
//         <input
//           type="text"
//           placeholder="Name product..."
//           className="border p-3 w-full rounded-lg bg-primary h-11 dark:text-black"
//           required
//           onChange={(e) => setName(e.target.value)}
//         />
//       </label>
//       <label className="flex flex-col text-xl text-subtitle mb-4 dark:text-gray-200 gap-2">
//         Price:
//         <input
//           type="text"
//           placeholder="$ Price"
//           className="border p-3 w-full rounded-lg bg-primary h-11 font-semibold dark:text-black"
//           required
//           onChange={(e) => setPrice(e.target.value)}
//         />
//       </label>
//       <button
//         type="submit"
//         className="bg-primary py-2 px-4 rounded-lg text-lg font-semibold"
//       >
//         Create
//       </button>
//     </div>
//     <div className="w-full md:w-[500px] h-64 border-dashed border-2 rounded border-blue-1 flex justify-center items-center flex-col cursor-pointer">
//       <img
//         src={
//           productImage
//             ? URL.createObjectURL(productImage)
//             : '/assets/icons/upload.svg'
//         }
//         alt="Upload Preview"
//         onClick={handleCreateProductClick}
//         className="w-52 h-52 object-contain rounded m-auto"
//       />
//       <p>Upload Product Image</p>
//       <input
//         type="file"
//         className="hidden"
//         ref={fileInputRef}
//         required
//         onChange={(e) =>
//           setProductImage(e.target.files ? e.target.files[0] : null)
//         }
//       />
//     </div>
//   </form>
//   <ToastContainer />
// </div>
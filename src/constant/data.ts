const inputs = [
  {
    type: 'text',
    placeholder: 'First Name',
    label: 'First Name',
    name: 'first_name',
  },
  {
    type: 'text',
    placeholder: 'Last Name',
    label: 'Last Name',
    name: 'last_name',
  },
  {
    type: 'text',
    placeholder: 'User Name',
    label: 'User Name',
    name: 'user_name',
  },
  { type: 'email', placeholder: 'Email', label: 'Email', name: 'email' },
  {
    type: 'password',
    placeholder: 'Password',
    label: 'Password',
    name: 'password',
  },
  {
    type: 'password',
    placeholder: 'Confirm Password',
    label: 'Confirm Password',
    name: 'password_confirmation',
  },
  {
    type: 'file',
    placeholder: '',
    label: 'Profile Image',
    name: 'profile_image',
  },
];
 const inputsLogin = [
   {
     type: 'text',
     placeholder: 'your email',
     label: 'email',
     name: 'email',
   },
   {
     type: 'password',
     placeholder: 'password',
     label: 'password',
     name: 'password',
   },
];
const inputCreate = [
  {
    type: 'text',
    placeholder: 'name Product',
    label: 'Name product',
    name: 'name',
  },
  {
    type: 'text',
    placeholder: 'price',
    label: 'price',
    name: 'price',
  },
  {
    type: 'file',
    placeholder: 'price',
    label: 'Upload Product Image',
    name: 'image',
  },
]
const linkSideBar = [
  { title: 'product', link: '/', icon: 'fa-solid fa-border-all' },
  { title: 'Favorites', link: 'favorate', icon: 'fa-regular fa-heart' },
  { title: 'Order List', link: 'orderlist', icon: 'fa-solid fa-list-check' },
]
export { inputs, inputsLogin, inputCreate, linkSideBar }
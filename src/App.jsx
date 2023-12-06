import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom'
import RegistrationForm from './Forms/RegistrationForm'
import LoginForm from './Forms/LoginForm'
import Supplier from './LandingPages/Supplier'
import Guest from './LandingPages/GuestSupplier'
import Navbar from './LandingPages/Navbar'
import AboutUs from './LandingPages/AboutUs'
import Blog from './LandingPages/Blog'
import Product from './LandingPages/Product'
import Quotation from './LandingPages/Quotation'
import Welcome from './LoggedInPages/AdminPages/Welcome'
import AdminNavbar from './LoggedInPages/AdminPages/Navbar/AdminNavbar'
import Transaction from './LoggedInPages/AdminPages/Transaction'
import Inventory from './LoggedInPages/AdminPages/Inventory'
import ProviderNavbar from './LoggedInPages/ProviderPages/Navbar/ProviderNavbar'
import SupplyMaterial from './LoggedInPages/ProviderPages/SupplyMaterial'
import ProviderTransaction from './LoggedInPages/ProviderPages/ProviderTransaction'
import CustomerNavbar from './LoggedInPages/CustomerPages/CustomerNavbar'
import EmployeeNavbar from './LoggedInPages/EmployeePages/EmployeeNavbar'
import AddCategory from './LoggedInPages/AdminPages/Category'
import Category from './LoggedInPages/AdminPages/Category'
import EmployeeTransaction from './LoggedInPages/EmployeePages/EmployeeTransaction'
import CustomerTransaction from './LoggedInPages/CustomerPages/CustomerTransaction'
import CustomerOrder from './LoggedInPages/CustomerPages/CustomerOrder'
import EmployeeOrder from './LoggedInPages/EmployeePages/EmployeeOrder'

function App() {
  const [count, setCount] = useState(0)

  const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    // loader: rootLoader,
    children: [
      {
        // index:'t'
        path: "",
        element: <AboutUs />,
        // loader: teamLoader,
      },
      {
        // index:'t'
        path: "aboutus",
        element: <AboutUs />,
        // loader: teamLoader,
      },
      {
        path: "blog",
        element: <Blog />,
        // loader: teamLoader,
      },
      {
        path: "products",
        element: <Product />,
        // loader: teamLoader,
      },
      {
        path: "request-quotation",
        element: <Quotation />,
        // loader: teamLoader,
      },
      {
        path: "login",
        element: <LoginForm />,
        // loader: teamLoader,
      },
       {
        path: "signup",
        element: <RegistrationForm />,
        // loader: teamLoader,
      },
    ],
    },
    {
    path: "/admin",
    element: <AdminNavbar />,
    // loader: rootLoader,
    children: [
      {
        // index:'t'
        path: "welcome",
        element: <Transaction />,
        // loader: teamLoader,
      },
      {
        path: "category",
        element: <Category />,
        // loader: teamLoader,
      },
     
      {
        path: "transaction",
        element: <Transaction />,
        // loader: teamLoader,
      },
     
      {
        path: "inventory",
        element: <Inventory />,
        // loader: teamLoader,
      },
    ],
  },
    {
    path: "/provider",
    element: <ProviderNavbar />,
    // loader: rootLoader,
    children: [
    
      {
        path: "welcome",
        element: <ProviderTransaction />,
        // loader: teamLoader,
      },
      {
        path: "transaction",
        element: <ProviderTransaction />,
        // loader: teamLoader,
      },
     
       {
        path: "supplyMaterial",
        element: <SupplyMaterial />,
        // loader: teamLoader,
      },
      {
        path: "transaction",
        element: <ProviderTransaction />,
        // loader: teamLoader,
      },
    ],
    },
  
    {
    path: "/customer",
    element: <CustomerNavbar />,
    // loader: rootLoader,
    children: [
    
      {
        path: "welcome",
        element: <CustomerTransaction />,
        // loader: teamLoader,
      },
      {
        path: "transaction",
        element: <CustomerTransaction />,
        // loader: teamLoader,
      },
     
       {
        path: "order-material",
        element: <CustomerOrder />,
        // loader: teamLoader,
      },
    
    ],
  },
    {
    path: "/employee",
    element: <EmployeeNavbar />,
    // loader: rootLoader,
    children: [
    
      {
        path: "welcome",
        element: <EmployeeTransaction />,
        // loader: teamLoader,
      },
      {
        path: "transaction",
        element: <EmployeeTransaction />,
        // loader: teamLoader,
      },
     
       {
        path: "orders",
        element: <EmployeeOrder />,
        // loader: teamLoader,
      },
     
    ],
  },
  ]);
  
  return (
      <RouterProvider router={router} />
  )
  // return (
  //   <>
  //     <Navbar/>
  //     <Routes>
  //                   <Route exact path="/" element={<AboutUs />} />
  //                   <Route exact path="/blog" element={<Blog />} />
  //                   <Route exact path="/product" element={<Product />} />
  //                   <Route exact path="/request-quotation" element={<Quotation />} />
  //                   <Route path="/register" element={<RegistrationForm/>} />
  //                   <Route path="/login" element={<LoginForm/>} />
  //                   <Route path="/Supplier" element={<Supplier/>} />
  //                   <Route path= "/Guest" element={<Guest/>}/>
  //                   {/* Add more routes as needed */}
  //               </Routes>
  //   </>
  // )
}

export default App

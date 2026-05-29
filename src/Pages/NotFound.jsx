
import { Link } from "react-router-dom"
import AuthLayout from "../Components/AuthLayout"

export default function NotFound() {
  return (
   <AuthLayout
      heading="404 not found"
      tagline={`Oops! The page you’re looking for doesn’t exist or may have been moved. Check the URL or return to the homepage to continue exploring`}
    >
      <div className=" h-full flex items-center gap-3 flex-col justify-center">
         <h2 className="text-secondary"><span className="text-red">404</span> not found</h2> 
         <p className="text-center">Oops! The page you’re looking for doesn’t exist or may have been moved. Check the URL or return to the homepage to continue exploring</p>
         <br />
         <div className="flex gap-1 w-full ">
          <Link to='/sign-up' className="btn flex-1 border bg-primary text-inverse">Sign up</Link>
          <Link to='sign-in' className="btn flex-1 bg-secondary text-inverse">Sign in</Link>

         </div>
         <Link to='/' className="btn w-full text-success bg-success-light">Home page</Link>
      </div>
  
    </AuthLayout>
  )
}

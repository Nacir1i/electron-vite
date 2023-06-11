import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="w-full h-full p-5 py-8 flex flex-col gap-7 items-center justify-center bg-gray-100 text-strong-contrast">
      <h1 className="text-center text-5xl">We couldn't find the resource you are looking for.</h1>
      <Link className="text-center text-highlight text-xl" to="/dashboard">Back to Dashboard</Link>
    </div>
  )
}

export default NotFound;
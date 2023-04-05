import {useState} from 'react'
import { productCategory } from '../../utils/enum'
const Home = () => {
  const [category, setCategory] = useState(productCategory.misc)

  return (
    <div className='Home-main-container'>
        Home
    </div>
  )
}

export default Home
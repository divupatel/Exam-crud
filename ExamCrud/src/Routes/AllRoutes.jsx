import {Routes,Route} from 'react-router-dom'
import Home from '../Pages/Home'
import Form from '../Pages/Form'

export default function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/form' element={<Form/>}/>
      </Routes>
    </div>
  )
}

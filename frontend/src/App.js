import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Register,ProtectedRoute, Landing} from "./pages"
import {SharedLayout,AllGoals,AddGoal,Profile} from './pages/dashboard'
function App(){
  return(
      <BrowserRouter>
      <Routes>
        <Route path='/' element={
            <ProtectedRoute>
              <SharedLayout />
              
          </ProtectedRoute>
        }>
          <Route path='all-goals' element={<AllGoals />}></Route>
          <Route path='add-goal' element={<AddGoal />}></Route>
          <Route path='profile' element={<Profile />}></Route>
          
          
        </Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/landing' element={<Landing/>}></Route>
      </Routes>
    </BrowserRouter>          
  )
}
export default App
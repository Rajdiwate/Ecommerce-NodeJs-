
import { useCallback} from 'react'
import {useDispatch , useSelector} from 'react-redux'
import {  getUser, logout } from '../redux/slices/authSlics'
import {useNavigate} from 'react-router-dom'

export const useAuth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user, loading, error, isAuthenticated } = useSelector(state=>state.user)

  const getCurrentUser = useCallback(() => {
    if (!user._id) {
      dispatch(getUser())
    }
  }, [dispatch])
  const logoutCurentUser = useCallback(() => {
    dispatch(logout())
    navigate('/')
  }, [dispatch])

  // useEffect(() => {
  //   if(!user.email){
  //     router.replace("/")
  //     setTimeout(()=>{
  //       document.dispatchEvent(openAuthFormEvent);
  //     },1000)
  //   }
  // }, [user.email]);

  return { user, loading, error, getCurrentUser, logoutCurentUser , isAuthenticated }
}

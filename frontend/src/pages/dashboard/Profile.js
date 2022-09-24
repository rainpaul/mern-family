import {useState} from 'react'
import {FormRow, Alert} from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const Profile = () => {
    const {user,showAlert,displayAlert,updateUser,isLoading} = useAppContext()
    const [name,setName] = useState(user?.name)
    const [email,setEmail] = useState(user?.email)
    const [dob,setDob] = useState(user?.dob)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!name || !email || !dob){
            displayAlert()
            return
        }
        const currentUser = {name,email,dob}
        updateUser({currentUser})
    }

    return(
        <Wrapper>
            <form className='form' onSubmit={handleSubmit}>
                <h3>Profile</h3>
                {showAlert && <Alert />}
                <div className='form-center'>
                    <FormRow
                        type='text'
                        name='name'
                        value={name}
                        handleChange={(e) =>setName(e.target.value)}
                    ></FormRow>
                    <FormRow 
                        type='text'
                        name='email'
                        value={email}
                        handleChange={(e) => setEmail(e.target.value)}
                    />
                    <FormRow 
                        type='text'
                        name='dob'
                        value={dob}
                        handleChange={(e) => setDob(e.target.value)}
                    />
                    <button
                        className='btn btn-block'
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading?'Please wait...':'save changes'}
                    </button>
                </div>
            </form>
        </Wrapper>
    )

}

export default Profile
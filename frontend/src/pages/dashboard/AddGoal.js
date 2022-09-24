import {FormRow, Alert} from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const AddGoal = () => {
    const {
        isLoading,
        isEditting,
        showAlert,
        displayAlert,
        handleChange,
        clearValues,
        createGoal,
        editGoal,
        content
    } = useAppContext()

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!content){
            displayAlert()
            return
        }

        if(isEditting){
            editGoal()
            return
        }
        createGoal()
    }

    const handleJobInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        handleChange({name,value})
    }

    return(
        <Wrapper>
            <form className='form'>
                <h3>{isEditting ? 'edit goal': 'add goal'}</h3>
                {showAlert && <Alert/>}
                <div className='form-center'>
                    <FormRow
                        type='text'
                        name='content'
                        value={content}
                        handleChange={handleJobInput}
                    ></FormRow>
                    <div className='btn-container'>
                        <button
                            type='submit'
                            className='btn btn-block submit-btn'
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >submit</button>
                        <button
                            className='btn btn-block clear-btn'
                            onClick={(e) => {
                                e.preventDefault()
                                clearValues()
                            }}>
                            clear
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    )
}

export default AddGoal
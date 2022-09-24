import moment from 'moment'
import {FaLocationArrow, FaCalendarAlt} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Goal'
import GoalInfo from './GoalInfo'

const Goal = ({
    _id,
    content,
    createdAt
}) => {
    const {setEditGoal,deleteGoal} = useAppContext()
    let date = moment(createdAt)
    date = date.format('MMM Do, YYYY - HH:MM')
    return(
        <>
            <Wrapper>
            <div className='content'>
                <div className='content-center'>
                    <GoalInfo icon={<FaLocationArrow/>} text={content}></GoalInfo>
                    <GoalInfo icon={<FaCalendarAlt/>} text={date}></GoalInfo>
                </div>
            </div>
            <footer>
                <div className='action'>
                    <Link to='/add-goal' 
                        className='btn edit-btn'
                        onClick={() => setEditGoal(_id)}>Edit</Link>
                    <button
                        type='button'
                        className='btn delete-btn'
                        onClick={() => deleteGoal(_id)}
                    >
                        Delete
                    </button>
                </div>
            </footer>
            </Wrapper>
            
        </>
        
    )
}

export default Goal
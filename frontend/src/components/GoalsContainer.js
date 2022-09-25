import { useAppContext } from "../context/appContext";
import {useEffect} from 'react'
import Loading from './Loading'
import Goal from './Goal'
import Wrapper from "../assets/wrappers/GoalsContainer";
import PageBtnContainer from "./PageBtnContainer";

const GoalsContainer = () => {
    const {
        getGoals,
        goals,
        isLoading,
        search,
        sort,
        page,
        numOfPages,
        totalGoals
    } = useAppContext()

    useEffect( () => {
        getGoals()
    },[search, sort, page])

    if(isLoading){
        return<Loading center />
    }
    
    if(goals === 0){
        return(
            <Wrapper>
                <h2>No goals to display...</h2>
            </Wrapper>
        )
    }

    return(
        <Wrapper>
            <h5>{totalGoals} goal{goals.length > 1 && 's'}</h5>
            <div className="goals">
                {goals.map((goal) => {
                    return <Goal key={goal._id} {...goal} />
                })}
            </div>
            {numOfPages >1 && <PageBtnContainer />}
        </Wrapper>
    )
}

export default GoalsContainer
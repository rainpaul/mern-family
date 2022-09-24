import Wrapper from "../assets/wrappers/GoalInfo";

const GoalInfo = ({icon,text}) => {
    return(
        <>
        <Wrapper>
            <span className="icon">{icon}</span>
            <span className="text">{text}</span>
            
        </Wrapper>
        
        </>
        
    )
}

export default GoalInfo
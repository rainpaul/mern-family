import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import {Logo} from '../components'
import {Link} from 'react-router-dom'

const Landing=() => {
    return(
        <Wrapper>
            <nav>
                <Logo></Logo>
            </nav>
            <div className='container page'>
                <div className='info'>
                    <h1>
                        job <span>tracking</span> app
                    </h1>
                    <p>
                        From Khang with love, and my wife (Cao Duyen)
                    </p>
                    <Link to='/register' className='btn btn-hero'>
                        Login/Register
                    </Link>   
                    
                    
                </div>
                <img src={main} alt='job hunt' className='img main-img'></img>
            </div>
        </Wrapper>
    )
}

export default Landing
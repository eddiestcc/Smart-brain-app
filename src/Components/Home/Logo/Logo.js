import Tilt from 'react-parallax-tilt';
import brain from './Brain AI.png'
import './Logo.css'

const Logo = () => {
    return(
        <div className="ma4 mt0">
            <Tilt className='logo'>
                <img src={brain} alt='logo'></img>
            </Tilt>
        </div>
    )
}


export default Logo;
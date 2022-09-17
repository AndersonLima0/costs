import styles from './LinkButtom.module.css'
import {Link} from 'react-router-dom'

function LinkButtom({to, text}){
    return(
        <Link className={styles.btn} to={to}>
            {text}
        </Link>
    )
}
export default LinkButtom;
import Message from "../components/layout/Message";
import {useLocation} from 'react-router-dom'
import styles from './Projects.module.css'
import Container from '../components/layout/Container'
import LinkButtom from "../components/layout/LinkButtom";

function Projects(){

    const location = useLocation()
    let message = ''

    if(location.state){
        message = location.state.message
    }

    return(
        <div className={styles.projects_container}>
            <div className={styles.title_container}>
                <h1>Meus projetos</h1>
                <LinkButtom to="/newproject" text="Cria projeto"/>
            </div>
            {message && <Message msg={message} type="sucess"/>}
            <Container customClass="start">
                <p>Projetos...</p>
            </Container>
        </div>
    )
}
export default Projects;
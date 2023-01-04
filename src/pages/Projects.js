import Message from "../components/layout/Message";
import {useLocation} from 'react-router-dom'
import styles from './Projects.module.css'
import Container from '../components/layout/Container'
import LinkButtom from "../components/layout/LinkButtom";
import ProjectCard from "../components/layout/project/ProjectCard";
import { useEffect, useState } from "react";

function Projects(){

    const [projects, setProjects] = useState([])

    const location = useLocation()
    let message = ''

    if(location.state){
        message = location.state.message
    }

    useEffect(() => {
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            },
        }).then(resp => resp.json())
        .then(data =>{
            console.log(data)
            setProjects(data)
        })
        .catch(err => console.log(err))
    },[])

    return(
        <div className={styles.projects_container}>
            <div className={styles.title_container}>
                <h1>Meus projetos</h1>
                <LinkButtom to="/newproject" text="Cria projeto"/>
            </div>
            {message && <Message msg={message} type="sucess"/>}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard
                        id={project.id}
                        name={project.name}
                        budget={project.budget}
                        category={project.category.name}
                        key={project.id}/>
                    ))}
            </Container>
        </div>
    )
}
export default Projects;
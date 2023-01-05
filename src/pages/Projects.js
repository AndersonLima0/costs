import Message from "../components/layout/Message";
import {useLocation} from 'react-router-dom'
import styles from './Projects.module.css'
import Container from '../components/layout/Container'
import LinkButtom from "../components/layout/LinkButtom";
import ProjectCard from "../components/layout/project/ProjectCard";
import { useEffect, useState } from "react";
import Loading from "../components/layout/Loading";

function Projects(){

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false);
    const [projectMessage, setProjectMessage] = useState(''); 

    const location = useLocation()
    let message = ''

    if(location.state){
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
            },
        }).then(resp => resp.json())
        .then(data =>{
            console.log(data)
            setProjects(data)
            setRemoveLoading(true)
        })
        .catch(err => console.log(err))
        },300)
    },[])

    function removeProject(id){
        fetch(`http://localhost:5000/projects/${id}`,{
        method: 'DELETE',
        headers : {
            'Content-type' : 'application/json'
        },

        }).then(resp => resp.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id))
            setProjectMessage("Projeto removido com sucesso!")
        })
        .catch(err => console.log(err))
    }

    return(
        <div className={styles.projects_container}>
            <div className={styles.title_container}>
                <h1>Meus projetos</h1>
                <LinkButtom to="/newproject" text="Cria projeto"/>
            </div>
            {message && <Message msg={message} type="success"/>}
            {projectMessage && <Message msg={projectMessage} type="success"/>}
            <Container customClass="start">
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard
                        id={project.id}
                        name={project.name}
                        budget={project.budget}
                        category={project.category.name}
                        key={project.id}
                        handleRemove={removeProject}
                        />
                    ))}
                    {!removeLoading && <Loading/>}
                    {removeLoading && projects.length === 0 && (
                        <p>Não há projetos cadastrados!</p>
                    )}
            </Container>
        </div>
    )
}
export default Projects;
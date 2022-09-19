import { useNavigate } from "react-router-dom";
import ProjectForm from '../components/layout/project/ProjectForm';
import styles from './NewProject.module.css'

function NewProject(){

    const navigate = useNavigate()// usado para redirect de pagina

    function createPost(project){
        //Inicaliza cost e services
        project.cost = 0
        project.services = []

        fetch("http://localhost:5000/projects",{
            method:'POST',
            headers:{
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            navigate("/projects")
        })
        .catch((err) => console.log(err))
    }

    return(
        <div className={styles.newproject_container}>
            <h1>Criar projeto</h1>
            <p>Crie seu projeto para depois adicionar os serviços</p>
            <ProjectForm handleSubmit={createPost} btnText="Cria projeto"/>
        </div>
    )
}
export default NewProject;
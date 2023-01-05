import styles from './Project.module.css'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from '../components/layout/Loading';
import Container from '../components/layout/Container';
import ProjectForm from '../components/layout/project/ProjectForm'
import Message from '../components/layout/Message'

function Project(){
    //useParams é para obter parametros*(valor,objetos...) na url
    const {id} = useParams()
    //state para controlar o estado atual(valor apresentado atualmente na tela)  
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjctForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();

    useEffect(() => {
        setTimeout(() =>{
            fetch(`http://localhost:5000/projects/${id}`,{
            method: "GET",
            headers: {
                'Content-Type' : 'application/json'
            }  
            }).then((resp) => resp.json())
            .then((data) => {
                setProject(data)
            })
            .catch((err) => console.log(err))
            },300)
    },[id])

    function editPost(project){
        if(project.budget < project.cost){
            setMessage("O orçamento não pode ser menor que o custo do projeto!")
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`,{
            //Metodo PATCH porque só muda o parametro enviado caso fosse UPDATE mudaria toda a entidade
            method: "PATCH",
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(project)
        }).then((resp) => resp.json())
        .then((data) => {
            setProject(data)
            setShowProjctForm(false)
            setMessage("Projeto atualizado!")
            setType('success')
        })
        .catch((err) => console.log(err))
    }

    function toggleProjectForm(){
        setShowProjctForm(!showProjectForm)
    }

    return( 
    <>
        {project.name ? (
            <div className={styles.project_details}>
                <Container customClass="column">
                    {message && <Message type={type} msg={message}/>}
                    <div className={styles.details_container}>
                        <h1>Projeto: {project.name}</h1>
                        <button className={styles.btn} onClick={toggleProjectForm}>
                            {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento:</span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total Utilizado:</span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm handleSubmit={editPost} btnText="Concluir edição" projectData={project}/>
                                </div>
                            )}
                    </div>
                </Container>
            </div>
           ) : (
                <Loading/>
        )}
    </>)
}
export default Project;
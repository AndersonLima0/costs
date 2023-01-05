import styles from './Project.module.css'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Loading from '../components/layout/Loading';
import Container from '../components/layout/Container';

function Project(){
    //useParams é para obter parametros*(valor,objetos...) na url
    const {id} = useParams()
    //state para controlar o estado atual(valor apresentado atualmente na tela)  
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjctForm] = useState(false);

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

    function toggleProjectForm(){
        setShowProjctForm(!showProjectForm)
    }

    return( 
    <>
        {project.name ? (
            <div className={styles.project_details}>
                <Container customClass="column">
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
                                    detalhes do projeto
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
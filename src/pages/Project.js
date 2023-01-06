import styles from './Project.module.css'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import {parse, v4 as uuidv4} from 'uuid'

import Loading from '../components/layout/Loading';
import Container from '../components/layout/Container';
import ProjectForm from '../components/layout/project/ProjectForm'
import Message from '../components/layout/Message'
import ServiceForm from '../components/service/ServiceForm';

function Project(){
    //useParams é para obter parametros*(valor,objetos...) na url
    const {id} = useParams()
    //state para controlar o estado atual(valor apresentado atualmente na tela)  
    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjctForm] = useState(false);
    const [message, setMessage] = useState();
    const [type, setType] = useState();
    const [showServiceForm, setShowServiceForm] = useState(false);


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
        setMessage('')

        if(project.budget < project.cost){
            setMessage("O orçamento não pode ser menor que o custo do projeto!")
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`,{
            //Metodo PATCH porque só muda o parametro enviado caso fosse PUT mudaria toda a entidade
            method: "PATCH",
            headers:{
                'Content-Type' : 'application/json'
            },
            //enviado o body porque estamos enviando dados para serem atualizados
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

    function createService(project){
        setMessage('')

        const lastService = project.services[project.services.length - 1]

        //uuidv4 dar um id unico
        lastService.id = uuidv4()

        //lastServiceCost pegará o custo desse ultimo serviço(serviçoAtual)
        const lastServiceCost = lastService.cost
        
        //newCost pega o custo atual do projeto e soma com o custo do ultimo serviço(atual) adicionado
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)


        if(newCost > parseFloat(project.budget)){
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')

            //pop está retirando o serviço que ultrapassou o valor
            project.services.pop()
            return false
        }
        //adiciona o custo ao projeto
        project.cost = newCost
        
        //atualiza o projeto  
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(project) 
        }).then((resp) => resp.json())
        .then((data) => setProject(data))
        .catch((err) => console.log(err))
    }

    function toggleProjectForm(){
        setShowProjctForm(!showProjectForm)
    }
    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
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
                    <div className={styles.service_form_container}>
                        <h2>Adicione um serviço:</h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>
                            {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm 
                                    handleSubmit={createService}
                                    textBtn="Adicionar serviço"
                                    projectData={project}/>
                                )}
                            </div>
                    </div>
                    <h2>Serviços</h2>
                    <Container customClass="start">
                        <p>Itens de serviços</p>
                    </Container>
                </Container>
            </div>
           ) : (
                <Loading/>
        )}
    </>)
}
export default Project;
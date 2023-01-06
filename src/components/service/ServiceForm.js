import styles from '../layout/project/ProjectForm.module.css'
import { useState } from 'react'
import Input from '../layout/Form/Input'
import SubmitButton from '../layout/Form/SubmitButton'

//handleSubmit que vai ser o que o submit vai passar
function ServiceForm({handleSubmit,textBtn,projectData}){

    const [service, setService] = useState({})

    function submit(e){
        e.preventDefault();
        //projectData tem a propriedade services(conjunto de serviços) e o push coloca nosso serviço(atual) sendo criado
        projectData.services.push(service)

        //handleSubmit recebeu a função createService de project.js e agora manda o projectData para a função createService
        //createService que irá adicionar no banco
        handleSubmit(projectData);

    }
    function handleChange(e){
        //e.target.name é o nome do input que vai ser a chave da propriedade do objeto service
        setService({...service,[e.target.name]: e.target.value})
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input
            type="text"
            text="Nome do serviço"
            name="name"
            placeholder="Insira o nome do serviço"
            handleOnChange={handleChange}
            />
            <Input
            type="number"
            text="Custo do serviço"
            name="cost"
            placeholder="Insira o valor total"
            handleOnChange={handleChange}
            />
            <Input
            type="text"
            text="Descrição do serviço"
            name="description"
            placeholder="Descreva o serviço"
            handleOnChange={handleChange}
            />
            <SubmitButton text={textBtn}/>
        </form>
    )
}
export default ServiceForm
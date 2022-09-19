import {useEffect, useState} from 'react'

import Input from '../Form/Input';
import Select from '../Form/Select';
import SubmitButton from '../Form/SubmitButton';
import styles from './ProjectForm.module.css'

function ProjectForm({handleSubmit, btnText, projectData}){
    
    const[categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    //Sem o useEffect o react fica realizando requests esperando que dado mude criando um loop
    //O useEffect garanti que a redenrização seja feita uma única vez
    //Ele inicialmente é vazio e depois é preenchido com o dados(resposta) do fecth de uma só vez
    useEffect(() =>{
    //request para  com fetch api para a url categories
    fetch("http://localhost:5000/categories",{
        method:"GET",// metodo de GET
        headers:{
            'Content-type':'application/json'//tipo do conteudo requerido é json
        }
    })
    .then((resp) => resp.json())//pega os dados e transforma em json
    .then((data) => {// data é colocado no hook de setCategories 
        setCategories(data)
    })
    .catch((err) => console.log(err))
    },[])
    
    const submit = (e) =>{//chamado pelo submit do form
        e.preventDefault()
        handleSubmit(project)
    }
    function handleChange(e){
        //pega todo o dado do project até então e diz que o nome dele será igual ao value
        setProject({...project, [e.target.name]: e.target.value})
    }

    function handleCategory(e){
        setProject({...project, category:{//cria um  objeto category e insere no project
            id:e.target.value,
            name:e.target.options[e.target.selectedIndex].text,
        },
    })
    }

    return(
        <form onSubmit={submit} className={styles.form}>
           <Input 
           type="text" 
           text="Nome do projeto" 
           name="name" 
           placeholder="Insira o nome do projeto"
           handleOnChange={handleChange}
           value={project.name ? project.name : ''}
           />

            <Input 
           type="number" 
           text="Orçamento do projeto" 
           name="budget" 
           placeholder="Insira o orçamento total"
           handleOnChange={handleChange}
           value={project.budget ? project.budget: ''}
           />
            
            <Select 
            name="category_id" 
            text="Selecione a categoria" 
            options={categories}
            handleOnChange={handleCategory}
            value={project.category ? project.category.id : ''}
            />
            <SubmitButton text={btnText}/>
        </form>
    )
}
export default ProjectForm;
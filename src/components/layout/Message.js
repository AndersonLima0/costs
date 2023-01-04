import styles from './Message.module.css'
import {useState,  useEffect} from 'react'

function Message({type, msg}){

    //setta a visibilidade da mensagem. Començando com falsa
    const[visible, setVisible] = useState(false)

    //condiciona se a mensagem é exibida ou não com base na props existente.
    //useEffect renderiza só uma vez a mensagema a ser exibida
    useEffect(() => {
        if(!msg){
            setVisible(false)
            return
        }

        setVisible(true)

        const timer = setTimeout(() =>{
            setVisible(false)
        }, 3000);
        return () => clearTimeout(timer)

    },[msg])

    return(
        //"visible &&" condiciona para que a mensagem só apareça caso true
        <>
        {visible && (
            //condiciona como a mensagem é exibida. Uma é padrão e a outra muda com a propriedade
            <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
        )}
        </>
    )
} 
export default Message;
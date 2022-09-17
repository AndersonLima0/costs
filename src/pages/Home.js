import styles from './Home.module.css'
import savings from '../../src/img/savings.svg'
import LinkButtom from '../components/layout/LinkButtom';

function Home(){
    return(
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar seus projetos agora mesmo!</p>
            <LinkButtom to="/newproject" text="Criar Projetos"/>
            <img src={savings} alt="Costs"/>
        </section>
    )
}
export default Home;
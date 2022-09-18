import styles from './Select.module.css'

//proriedade options é mapeada, option é o objeto utilizado para alimentar a option do select dinamicamente

function Select({text, name, options,handleOnChange, value}){
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select name={name} id={name}>
                <option>Selecione uma opção</option>
                {options.map((option) => (
                    <option value={option.id} key={option.id}>{option.name}</option>
                ))}
            </select>
        </div>
    )
}
export default Select;
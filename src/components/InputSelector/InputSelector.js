import "./InputSelector.scss"

const InputSelector = ({value, placeholder, onInputChange, onSelectChange, options}) => {


    const handleInputChange = (event) => {
        onInputChange(event.target.value)
    }

    const handleSelectChange = (event) => {
        onSelectChange(event.target.value)
    }

    return (
        <div className="is-container">
            <input className="is-input" value={value} placeholder={placeholder} onChange={handleInputChange}/>
            <select className="is-select" onChange={handleSelectChange}>
                {options.map((item) => (
                    <option className="is-option" value={item.value}>{item.label}</option>
                ))}
            </select>
        </div>
    );
}
 
export default InputSelector;
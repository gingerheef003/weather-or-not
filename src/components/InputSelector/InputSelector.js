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
            <input className="is-input" autoFocus value={value} placeholder={placeholder} onChange={handleInputChange}/>
            {
                options.length > 1 ? (
                    <select className="is-select" onChange={handleSelectChange} defaultValue={options[0].value}>
                        {options.map((item, index) => (
                            <option className="is-option" value={item.value} key={index}>{item.label}</option>
                        ))}
                    </select>
                ) : options.length === 1 ? options[0].loading ? options[0].loadingAnimation : (
                    <div className="is-output">
                        {options ? options[0].label : ""}
                    </div>
                ) : "" 
            }
        </div>
    );
}

export default InputSelector;
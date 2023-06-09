import axios from "axios";
import { useState } from "react";
import Select from "react-select";
import InputSelector from "../InputSelector/InputSelector";


const Search = () => {
    const [input, setInput] = useState('');
    const [options, setOptions] = useState([
        {
            value: 'asdf',
            label: 'ASDF',
        },
        {
            value: 'jkl;',
            label: 'JKL:',
        },
    ]);
    const [timer, setTimer] = useState(null);
    const [option, setOption] = useState(null);

    const request = async () => {
        if (input) {
            const response = await axios.get('https://spott.p.rapidapi.com/places/autocomplete', {
                headers: {
                    'X-RapidAPI-Key': '1f801c3222msh64f9fe6a43ed718p1cf750jsnd05a4ad3925f',
                    'X-RapidAPI-Host': 'spott.p.rapidapi.com'
                },
                params: {
                    q: input
                }
            })
            setOptions(response.data.map((item) => ({
                value: item.id,
                label: item.name + (item.country ? (", " + item.country.id) : "")
            })))
            console.log(options)
        }
        console.log('helo')
    }

    const handleInputChange = (input) => {
        setInput(input)

        if (timer) clearTimeout(timer)
        const newTimer = setTimeout(request, 500)
        setTimer(newTimer)
    }
    
    const handleSelectChange = (option) => {
        setOption(option)
    }
    
    return ( 
        <div className="container">
            <InputSelector
                value={option}
                placeholder={"Search..."}
                onInputChange={handleInputChange}
                onSelectChange={handleSelectChange}
                options={options}
            />
        </div>
     );
}
 
export default Search;
import { useState } from "react";
import InputSelector from "../InputSelector/InputSelector";


const Search = () => {
    const [input, setInput] = useState('');
    const [options, setOptions] = useState([]);
    const [timer, setTimer] = useState(null);
    const [option, setOption] = useState({});

    const request = async () => {
        await fetch(`https://spott.p.rapidapi.com/places/autocomplete?q=${input}`, {
            headers: {
                'X-RapidAPI-Key': '1f801c3222msh64f9fe6a43ed718p1cf750jsnd05a4ad3925f',
                'X-RapidAPI-Host': 'spott.p.rapidapi.com'
            }
        }).then((response) => {
            if (response.ok) return response.json()
            else throw new Error('API request failed:', response.status)
        }).then((data) => {
            setOptions(data.map((item) => ({
                value: item.coordinates,
                id: item.id,
                label: item.name + (item.country ? `, ${item.country.id}` : "")
            })))
        }).catch((error) => {
            console.error('Error:',error);
        })
    }

    const handleInputChange = (input) => {
        setInput(input)

        if (timer) clearTimeout(timer)
        if (input) {
            setOptions([{
                loading: true,
                loadingAnimation: (
                    <div class="container">
                        <div className="loader loader-3"></div>
                    </div>
                )
            }])
            const newTimer = setTimeout(request, 500)
            setTimer(newTimer)
        } else {
            setOptions([])
        }
    }
    
    const handleSelectChange = (option) => {
        setOption(option)
        console.log(option)
    }
    
    return ( 
        <div className="container">
            <InputSelector
                value={input}
                placeholder={"Search..."}
                onInputChange={handleInputChange}
                onSelectChange={handleSelectChange}
                options={options}
            />
        </div>
     );
}
 
export default Search;
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
        const [jsonInput, setJsonInput] = useState('');
        const [error, setError] = useState('');
        const [responseData, setResponseData] = useState(null);
        const [options, setOptions] = useState({
            alphabets: false,
            numbers: false,
            highestLowercase: false,
        });

        const handleChange = (e) => {
            setJsonInput(e.target.value);
            setError('');
        };

        const handleOptionChange = (e) => {
            setOptions({...options, [e.target.name]: e.target.checked });
        };

        const handleSubmit = async(e) => {
            e.preventDefault();
            try {
                // Validate JSON input
                const parsedData = JSON.parse(jsonInput);
                if (!parsedData.data || !Array.isArray(parsedData.data)) {
                    throw new Error("Invalid data format. Expected an array.");
                }

                // Make API call
                const response = await axios.post('https://fierce-inlet-05658-ffdeb713d47f.herokuapp.com/bfhl', parsedData);
                setResponseData(response.data);
                setError(''); // Clear error on success
            } catch (err) {
                if (err.response) {
                    // API error
                    setError(`API Error: ${err.response.data.message || 'Something went wrong'}`);
                } else {
                    // JSON parse error
                    setError(`Invalid JSON input: ${err.message}`);
                }
                setResponseData(null); // Clear previous response data
            }
        };

        const handleFinalSubmit = () => {
            // Logic to filter response based on selected options
            let filteredData = responseData;
            if (options.alphabets) {
                filteredData = filteredData.filter(item => /^[A-Za-z]+$/.test(item));
            }
            if (options.numbers) {
                filteredData = filteredData.filter(item => /^[0-9]+$/.test(item));
            }
            if (options.highestLowercase) {
                const highest = filteredData.filter(item => /^[a-z]+$/.test(item));
                // Process for highest lowercase if needed
                // Example: get highest character
                const maxChar = Math.max(...highest.map(item => item.charCodeAt(0)));
                filteredData = String.fromCharCode(maxChar);
            }

            // Display final response
            setResponseData(filteredData);
        };

        return ( <
            div >
            <
            h1 > Your Roll Number < /h1> <
            form onSubmit = { handleSubmit } >
            <
            textarea value = { jsonInput }
            onChange = { handleChange }
            placeholder = 'Enter JSON input here' /
            >
            <
            button type = "submit" > Submit < /button> {
                error && < div style = {
                        { color: 'red' } } > { error } < /div>} <
                    /form>

                {
                    responseData && ( <
                        div >
                        <
                        h2 > Select Options < /h2> <
                        label >
                        <
                        input type = "checkbox"
                        name = "alphabets"
                        checked = { options.alphabets }
                        onChange = { handleOptionChange }
                        />
                        Alphabets <
                        /label> <
                        label >
                        <
                        input type = "checkbox"
                        name = "numbers"
                        checked = { options.numbers }
                        onChange = { handleOptionChange }
                        />
                        Numbers <
                        /label> <
                        label >
                        <
                        input type = "checkbox"
                        name = "highestLowercase"
                        checked = { options.highestLowercase }
                        onChange = { handleOptionChange }
                        />
                        Highest lowercase alphabet <
                        /label> <
                        button onClick = { handleFinalSubmit } > Show Response < /button> <
                        /div>
                    )
                }

                {
                    responseData && ( <
                        div >
                        <
                        h2 > Response: < /h2> <
                        pre > { JSON.stringify(responseData, null, 2) } < /pre> <
                        /div>
                    )
                } <
                /div>
            );
        };

        export default App;
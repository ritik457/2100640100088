import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [numberId, setNumberId] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async () => {
        try {
            const res = await axios.post('http://localhost:9876/numbers/e');
            setResponse(res.data);
        } catch (error) {
            console.error('Error fetching data', error);
            setResponse({ error: 'Failed to fetch data' });
        }
    };

    return (
        <div className="App">
            <h1>Average Calculator</h1>
            <input
                type="text"
                value={numberId}
                onChange={(e) => setNumberId(e.target.value)}
                placeholder="Enter number ID (p, f, e, r)"
            />
            <button onClick={handleSubmit}>Submit</button>
            {response && (
                <div>
                    <h2>Response:</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;
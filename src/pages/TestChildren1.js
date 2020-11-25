import {Link} from 'react-router-dom';

function TestChildren1() {
    return (
        <div className="App">
            <h1>TestChildren1</h1>
            <Link to="/test2">Test2</Link>
        </div>
    );
}

export default TestChildren1;

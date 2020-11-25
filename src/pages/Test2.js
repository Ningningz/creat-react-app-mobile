import {Link} from 'react-router-dom';

function Test2() {
    return (
        <div className="App">
            <h1>Test2</h1>
            <Link to="/test1/children1">Children  TestChilren1</Link>
            <br />
            <Link to="/test1/home">Test1</Link>
        </div>
    );
}

export default Test2;

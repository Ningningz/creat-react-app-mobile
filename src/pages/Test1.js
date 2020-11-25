import {Link} from 'react-router-dom';
function Test1() {
  return (
    <div className="App">
      <h1>Test1</h1>
      <Link to="/test2">Test2</Link>
      <br/>
      <Link to="/test1/children1">Children  TestChilren1</Link>
    </div>
  );
}

export default Test1;

import { Container } from 'react-bootstrap';
import './App.css';
import Todo from './Components/Todo';

function App() {
    return (
        <div className='App'>
            <Container>
                <Todo />
            </Container>
        </div>
    );
}

export default App;

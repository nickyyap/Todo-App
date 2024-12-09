import { Container, Row, Card, Badge, Col, Button } from 'react-bootstrap';
import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const { todos, setTodos } = useContext(TodoContext);
    const navigate = useNavigate();

    const handleDelete = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };
    return (
        <Container>
            <h1 className="my-3">Your todos</h1>
            <Row>
                <CardGroup todos={todos} handleDelete={handleDelete} navigate={navigate} />
            </Row>
        </Container>
    );
}

function CardGroup({ todos, handleDelete, navigate }) {
    return todos.map((todo) => {
        const completed = todo.completed;
        const badge = completed ? "success" : "danger";
        return (
            <Col md={4} key={todo.id}>
                <Card className="my-3">
                    <Card.Body>
                        <Card.Title>{todo.title}</Card.Title>
                        <Card.Text>{todo.description}</Card.Text>
                        <div className="d-flex flex-column align-items-start">
                            <Badge bg={badge}>{!completed && "Not"} Completed</Badge>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDelete(todo.id)}
                                className="mt-2"
                            >Delete</Button>
                            <Button
                                variant="dark"
                                size="sm"
                                onClick={() => navigate(`/edit/${todo.id}`)}
                                className="mt-2">Edit</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        );
    });
}
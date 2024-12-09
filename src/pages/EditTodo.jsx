import { Container, Form, Button } from 'react-bootstrap';
import { useState, useContext, useEffect } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { useNavigate, useParams } from "react-router-dom";

export default function EditTodo() {
    const {id} = useParams();
    const {todos, setTodos} = useContext(TodoContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        const todoToEdit = todos.find((todo) => todo.id === parseInt(id));
        if(todoToEdit) {
            setTitle(todoToEdit.title);
            setDescription(todoToEdit.description);
            setCompleted(todoToEdit.completed);
        }
    }, [id, todos]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const updatedTodos = todos.map((todo) => 
        todo.id === parseInt(id) ? {...todo, title, description, completed} : todo);

        setTodos(updatedTodos);
        navigate("/")
    }


    return (
        <Container>
            <h1 className="my-3">Edit Todo</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Get software developer job"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        row={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder={`1. Create amazing project\n2. Apply to Google & Netflix\n3. Crush interview`}
                        required
                    />
                </Form.Group>

                <Form.Check
                    className="mb-3"
                    type="checkbox"
                    label="Mark as completed"
                    id="completed"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                />

                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </Container>
    )

}
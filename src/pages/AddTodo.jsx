import { Container, Form, Button } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { useNavigate } from "react-router-dom";

export default function AddTodo() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    const setTodos = useContext(TodoContext).setTodos;
    const todos = useContext(TodoContext).todos;
    const navigate = useNavigate();


    return (
        <Container>
            <h1 className="my-3">Add Todo</h1>
            <Form
                onSubmit={event => {
                    event.preventDefault();
                    setTodos([...todos, { id: Date.now(), title, description, completed },]);
                    navigate("/");
                }}>
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
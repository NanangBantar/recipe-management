import { Form, Button, Container, Card } from "react-bootstrap";
import { useState, Fragment } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import saveToken from "../simplelocalstorage/saveToken";

const Login = () => {
    const history = useHistory();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = async e => {
        e.preventDefault();
        const theData = {
            email,
            password
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const body = JSON.stringify(theData);

            const res = await axios.post("http://localhost:5000/api/user", body, config);
           
            if(res.status === 200){
                saveToken(res.data.token);
                history.push("/Home");
            }
        } catch (error) {
            console.log(error.response.data);
        }
    }

    return (
        <Fragment>
            <Container className="mt-4 col-8">
                <Card className="p-4 shadow">
                    <Form onSubmit={e => onSubmit(e)}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" type="email" onChange={e => onChange(e)} value={email} placeholder="Enter email" required />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" onChange={e => onChange(e)} value={password} placeholder="Password" required />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
  </Button>
                    </Form>
                </Card>
            </Container>
        </Fragment>
    );
}

export default Login;
import { Form, Button, Row, Col, Table, Modal } from "react-bootstrap";
import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import getToken from "../../../simplelocalstorage/getToken";

const Bahan = () => {
    const [dataBahan, setDataBahan] = useState();
    const [show, setShow] = useState(false);
    const [updbahan, setUpdbahan] = useState();
    const [srcBahan, setSrcBahan] = useState();
    const [idModal, setIdModal] = useState({
        id: "",
        desc: ""
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState({
        bahan: ""
    });

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': getToken()
        }
    }

    const { bahan } = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        const theData = {
            bahan
        }

        try {
            const body = JSON.stringify(theData);
            const res = await axios.post("http://localhost:5000/api/recipe", body, config);
            console.log(res.data.msg);
            databahan();
        } catch (error) {
            console.log(error.response.data);
        }
    }

    const databahan = async () => {
        const response = await axios.get("http://localhost:5000/api/recipe/bahan", config);
        console.log(response.data);
        return setDataBahan(response.data);
    }

    const handleDelete = async (e) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/recipe/${e.target.value}`, config);
            console.log(res);
            databahan();
        } catch (error) {
            console.log(error.response.data);
        }
    }

    const handleChange = async (e) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/recipe/bahan/${e.target.value}`, { bahan: updbahan }, config);
            databahan();
        } catch (error) {
            console.log(error.response.data);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(srcBahan);
        try {
            const response = await axios.get(`http://localhost:5000/api/recipe/bahan/${srcBahan}`, config);
            return setDataBahan(response.data);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        databahan();
    }, []);

    return (
        <Fragment>
            <Row>
                <Col>
                    <Form onSubmit={e => onSubmit(e)}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Masukan Bahan</Form.Label>
                            <Form.Control name="bahan" type="text" placeholder="Bahan Makanan" onChange={e => onChange(e)} value={bahan} required />
                            <Form.Text className="text-muted">
                                Masukan bahan-bahan anda
                </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
        </Button>
                    </Form>
                </Col>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label className="h6">Cari Bahan berdasarkan nama</Form.Label>
                            <Form.Control onChange={e => setSrcBahan(e.target.value)} type="text" placeholder="Masukan nama bahan" />
                            <Button type="submit" className="mt-2" variant="primary">Cari</Button>
                        </Form.Group>
                    </Form>
                    <Table className="text-center" striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Bahan</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataBahan && dataBahan.map((a, index) => (
                                <>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>
                                            {a.bahan}
                                        </td>
                                        <td>
                                            <Button value={a._id} onClick={e => { handleShow(); setIdModal({ id: a._id, desc: a.bahan }); }} className="mr-2" variant="primary" size="sm">Edit</Button>
                                            <Button value={a._id} onClick={handleDelete} variant="primary" size="sm">Hapus</Button>
                                        </td>
                                    </tr>
                                </>
                            ))}

                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Ubah Bahan <b>{idModal.desc}</b></Form.Label>
                            <Form.Control onChange={e => setUpdbahan(e.target.value)} type="text" placeholder="Masukan nama bahan" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>
                    <Button value={idModal.id} variant="primary" onClick={e => { handleClose(); handleChange(e); }}>
                        Save Changes
          </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    );
}

export default Bahan;
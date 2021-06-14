import { Form, Button, Row, Col, Table, Modal } from "react-bootstrap";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import getToken from "../../../simplelocalstorage/getToken";

const Kategori = () => {
    const [dataKategori, setDataKategori] = useState();
    const [show, setShow] = useState(false);
    const [updkategori, setUpdkategori] = useState();
    const [srcKategori, setSrcKategori] = useState();
    const [idModal, setIdModal] = useState({
        id: "",
        desc: ""
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState({
        kategori: ""
    });

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': getToken()
        }
    }

    const { kategori } = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmit = async (e) => {
        e.preventDefault();

        const theData = {
            kategori
        }

        try {
            const body = JSON.stringify(theData);
            const res = await axios.post("http://localhost:5000/api/recipe/kategori", body, config);
            console.log(res.data.msg);
            loadKategori();
        } catch (error) {
            console.log(error.response.data);
        }
    }

    const loadKategori = async () => {
        const response = await axios.get("http://localhost:5000/api/recipe/kategori", config);
        console.log(response);
        return setDataKategori(response.data);
    }

    const handleDelete = async (e) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/recipe/kategori/${e.target.value}`, config);
            loadKategori();
        } catch (error) {
            console.log(error.response.data);
        }
    }

    const handleChange = async (e) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/recipe/kategori/${e.target.value}`, { kategori: updkategori }, config);
            loadKategori();
        } catch (error) {
            console.log(error.response.data);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:5000/api/recipe/kategori/${srcKategori}`, config);
            return setDataKategori(response.data);
        } catch (error) {
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        loadKategori();
    }, []);

    return (
        <Fragment>
            <Row>
                <Col lg={6} xs={12}>
                    <Form onSubmit={e => onSubmit(e)}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Buat Kategori Baru</Form.Label>
                            <Form.Control name="kategori" type="text" value={kategori} onChange={e => onChange(e)} placeholder="Nama Kategori" required />
                            <Form.Text className="text-muted">
                                Buat Kategori makanan
                </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
    </Button>
                    </Form>
                </Col>
                <Col lg={6} xs={12}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label className="h6">Cari Kategori berdasarkan nama</Form.Label>
                            <Form.Control onChange={e => setSrcKategori(e.target.value)} type="text" placeholder="Masukan nama kategori" />
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
                            {dataKategori && dataKategori.map((a, index) => (
                                <>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>
                                            {a.kategori}
                                        </td>
                                        <td>
                                            <Button onClick={e => { handleShow(); setIdModal({ id: a._id, desc: a.kategori }); }} className="mr-2" variant="primary" size="sm">Edit</Button>
                                            <Button value={a._id} onClick={handleDelete} variant="primary" size="sm">Hapus</Button>
                                        </td>
                                    </tr>
                                </>
                            ))}

                        </tbody>
                    </Table>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Ubah Bahan <b>{idModal.desc}</b></Form.Label>
                                    <Form.Control onChange={e => setUpdkategori(e.target.value)} type="text" placeholder="Masukan nama kategori" />
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
                </Col>
            </Row>
        </Fragment>
    );
}

export default Kategori;
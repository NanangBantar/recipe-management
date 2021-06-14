import { Card, Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";
import getToken from "../../../simplelocalstorage/getToken";

const Foodcard = () => {
    const [resep, setResep] = useState();
    const [srcResep, setSrcResep] = useState();
    const [publish, setPublish] = useState({
        id:"",
        desc:""
    });

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': getToken()
        }
    }

    const loadData = async () => {
        const response = await axios.get(`http://localhost:5000/api/recipe/makanan?populate=${JSON.stringify(["bahan.id_bahan", "kategori"])}&filter=${JSON.stringify({})}`, config);
        console.log(response.data.docs);
        return setResep(response.data.docs);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.get(`http://localhost:5000/api/recipe/makanan?populate=${JSON.stringify(["bahan.id_bahan", "kategori"])}&filter=${JSON.stringify({ makanan: srcResep })}`, config);
        return setResep(response.data.docs);
    }

    const handleDelete = async (e) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/recipe/resep/${e}`, config);
            loadData();
        } catch (error) {
            console.log(error.response.data);
        }
    }

    const handlePublish = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/api/recipe/resep/${publish.id}/${publish.desc}`, config);
            loadData();
        } catch (error) {
            console.log(error.response.data);
        }
    }


    useEffect(() => {
        loadData();
    }, []);


    return (
        <Container>
            <Form className="mt-4" onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label className="h6">Cari Resep berdasarkan nama</Form.Label>
                    <Form.Control onChange={e => setSrcResep(e.target.value)} type="text" placeholder="Masukan nama resep" />
                    <Button type="submit" className="mt-2" variant="primary">Cari</Button>
                </Form.Group>
            </Form>
            <Card className="border-0">
                <Card.Body>

                    {(resep && resep.map(a => (
                        <Card className="mb-2">
                            <Card.Body>
                                <Card.Title>{a.makanan}</Card.Title>
                                <Card.Text>
                                    {a.bahan.filter((val) => val?.id_bahan).map((b, index,) => (
                                        <>
                                            {`${b?.id_bahan?.bahan}${a?.bahan[index + 1] ? ", " : ""}`}
                                        </>
                                    ))}
                                </Card.Text>
                                <Card.Link>{a?.kategori?.kategori}</Card.Link>
                                { a?.status == "Not" ? <Button onClick={ e => { handlePublish(); setPublish({ id:a._id, desc:a.status }); }} variant="secondary" className="rounded-0 m-2" size="sm">Publish RESEP API</Button> : <Button onClick={ e => { handlePublish(); setPublish({ id:a._id, desc:a.status }); }} variant="secondary" className="rounded-0 m-2" size="sm">Unpublish RESEP API</Button> }
                                <Card.Link onClick={e => handleDelete(a?._id)} style={{ cursor: "pointer" }} className="text-danger">Hapus</Card.Link>
                            </Card.Body>
                        </Card>
                    )))}

                </Card.Body>
            </Card>
        </Container>
    );
}

export default Foodcard;
import { Form, Button } from "react-bootstrap";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import getToken from "../../../simplelocalstorage/getToken";

const Resep = () => {
    const [selKategori, setSelKategori] = useState();
    const [dataBahan, setDataBahan] = useState();
    const [tagsBahan, setTagsBahan] = useState([]);
    const [idtagsBahan, setIdTagsBahan] = useState([]);
    const [kategori, setKategori] = useState("");
    const [nmMakanan, setNmMakanan] = useState("");


    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': getToken()
        }
    }

    const dataselect = async () => {
        const response = await axios.get("http://localhost:5000/api/recipe/kategori", config);
        setKategori(response.data[0]?._id);
        return setSelKategori(response.data);
    }

    const databahan = async () => {
        const response = await axios.get("http://localhost:5000/api/recipe/bahan", config);
        return setDataBahan(response.data);
    }

    const newBahan = (e) => {
        const selectedIndex = dataBahan.findIndex(h => h._id === e.target.value);
        const selectedData = dataBahan[selectedIndex];
        setTagsBahan([...tagsBahan, selectedData.bahan]);
        setIdTagsBahan([...idtagsBahan, e.target.value]);
    }

    useEffect(() => {
        dataselect();
        databahan();
    }, []);


    const onSubmit = async (e) => {
        e.preventDefault();

        // console.log({ kategori: kategori, makanan: nmMakanan, bahan: idtagsBahan });
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': getToken()
                }
            }
            const res = await axios.post("http://localhost:5000/api/recipe/makanan", { kategori, makanan: nmMakanan, bahan: idtagsBahan.map(val => ({ id_bahan: val })) }, config);
            console.log(res);

        } catch (error) {
            console.log(error.response.data);
        }
    };


    return (
        <Fragment>
            <Form onSubmit={e => onSubmit(e)}>
                <Form.Group>
                    <Form.Label>Kategori Makanan</Form.Label>
                    <Form.Control onChange={e => setKategori(e.target.value)} as="select" custom>
                        {selKategori && selKategori.map(val => (
                            <option value={val._id}>{val.kategori}</option>
                        ))}
                    </Form.Control>
                    <Form.Text className="text-muted">
                        pilih Kategori makanan
                </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Nama Makanan</Form.Label>
                    <Form.Control onChange={e => setNmMakanan(e.target.value)} type="text" placeholder="Nama makanan" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Bahan Makanan</Form.Label>
                    <Form.Control onChange={e => newBahan(e)} as="select" custom>
                        {dataBahan && dataBahan.map(val => (
                            <option value={val._id}>{val.bahan}</option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Resep Makanan</Form.Label>
                    <Form.Control as="textarea" rows={3} value={tagsBahan} readOnly />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
    </Button>
            </Form>
        </Fragment>
    );
}

export default Resep;
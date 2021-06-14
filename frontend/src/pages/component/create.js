import { Container, Nav, Navbar, Breadcrumb } from "react-bootstrap";
import { useState } from "react";
import { Link } from 'react-router-dom';
import Bahan from "./form/bahan";
import Resep from "./form/resep";
import Kategori from "./form/kategori";

const Create = () => {
    const [pageCreate, setPageCreate] = useState({
        s1: "Bahan",
        s2: <Bahan />,
    });

    const [current, setCurrent] = useState(0);

    return (
        <>
            <Container className="mt-4">

                <Nav variant="pills" defaultActiveKey="/home">
                    <Nav.Item>
                        <Nav.Link className={current === 0 ? "active" : ""} onClick={e => { setPageCreate({ s1: "Bahan", s2: <Bahan /> }); setCurrent(0) }}>Bahan</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className={current === 1 ? "active" : ""} onClick={e => { setPageCreate({ s1: "Kategori", s2: <Kategori /> }); setCurrent(1); }}>Kategori</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link className={current === 2 ? "active" : ""} onClick={e => { setPageCreate({ s1: "Resep", s2: <Resep /> }); setCurrent(2); }}>
                            Resep
                    </Nav.Link>
                    </Nav.Item>
                </Nav>

            </Container>

            <Container className="mt-4 col-10">
                {pageCreate.s2}
            </Container>

        </>
    );
}

export default Create;
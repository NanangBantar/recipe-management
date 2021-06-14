const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Bahan = require("../../model/Bahan");
const Kategori = require("../../model/Kategori");
const auth = require("../../middleware/auth");
const Resep = require("../../model/Resep");

router.post("/", auth, [
    check("bahan", "Bahan is required").not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { bahan } = req.body;

    try {
        let ingridient = await Bahan.findOne({ bahan });
        if (ingridient) {
            return res.status(400).json({ errors: [{ msg: "Bahan telah tersedia" }] });
        }

        ingridient = new Bahan({
            bahan,
        });

        await ingridient.save();

        res.json({ msg: "Berhasil di tambahkan" });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error...");
    }
});

router.post("/kategori", auth, [
    check("kategori", "Kategori is required").not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { kategori } = req.body;

    try {
        let category = await Kategori.findOne({ kategori });
        if (category) {
            return res.status(400).json({ errors: [{ msg: "Kategori telah tersedia" }] });
        }

        category = new Kategori({
            kategori,
        });

        await category.save();

        res.json({ msg: "Berhasil di tambahkan" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error...");
    }

});

router.get("/kategori", auth, async (req, res) => {
    try {
        let category = await Kategori.find({}).select("-date -__v");
        res.json(category);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error...");
    }
});

router.get("/bahan", auth, async (req, res) => {
    try {
        let bahan = await Bahan.find({}).select("-date -__v");
        res.json(bahan);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error...");
    }
});

router.post("/makanan", auth, [
    check("kategori", "kategori is required").not().isEmpty(),
    check("makanan", "Nama makanan is required").not().isEmpty(),
    check("bahan", "Bahan makanan is required").not().isEmpty()
], async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    const { kategori, makanan, bahan } = req.body;

    try {
        let resep = await Resep.findOne({ makanan });

        if (resep) {
            return res.status(400).json({ errors: [{ msg: "Kategori telah tersedia" }] });
        }

        resep = new Resep({
            kategori,
            makanan,
            bahan
        });

        await resep.save();
        res.json({ msg: "Berhasil di tambahkan" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error...");
    }
});

router.get("/makanan", auth, async (req, res) => {
    const { populate, filter } = req.query;

    try {
        let resep = await Resep.paginate(JSON.parse(filter), { populate: JSON.parse(populate) });
        console.log(resep);
        res.json(resep);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error...");
    }
});

router.delete("/:id", auth, async (req, res) => {

    const { id } = req.params;

    try {
        let bahan = await Bahan.findOne({ _id: id });
        console.log(bahan);
        if (!bahan) {
            return res.status(400).json({ errors: [{ msg: "Bahan tidak ditemukan" }] });
        }
        await bahan.remove();

        res.send("berhasil");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error...");
    }
});

router.delete("/kategori/:id", auth, async (req, res) => {

    const { id } = req.params;

    try {
        let category = await Kategori.findOne({ _id: id });
        console.log(category);
        if (!category) {
            return res.status(400).json({ errors: [{ msg: "Kategori tidak ditemukan" }] });
        }
        await category.remove();

        res.send("berhasil");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error...");
    }
});

router.get("/kategori/:id", auth, async (req, res) => {

    const { id } = req.params;
    try {
        let category = await Kategori.find({ kategori: id }).select("-date -__v");
        res.json(category);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error...");
    }

});

router.get("/bahan/:id", auth, async (req, res) => {

    const { id } = req.params;
    try {
        let ingridient = await Bahan.find({ bahan: id }).select("-date -__v");
        res.json(ingridient);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error...");
    }

});

router.put("/bahan/:id", auth, [
    check("bahan", "Bahan is rquired").not().isEmpty()
], async (req, res) => {
    const { id } = req.params;
    const { bahan } = req.body;
    try {
        await Bahan.updateOne({ _id: id }, { $set: { bahan: bahan } });
        res.json(bahan);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error...");
    }
});

router.put("/kategori/:id", auth, [
    check("kategori", "kategori is rquired").not().isEmpty()
], async (req, res) => {
    const { id } = req.params;
    const { kategori } = req.body;
    try {
        await Kategori.updateOne({ _id: id }, { $set: { kategori: kategori } });
        res.json(kategori);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error...");
    }
});

router.put("/resep/:id/:status", async (req, res) => {
    const { id, status } = req.params;
    let publish;

    status == "Not" ? publish = "Yes" : publish = "Not";
    try {
        await Resep.updateOne({ _id:id } ,{ status: publish });
        res.json({ msg:"Berhasil" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error...");
    }
});

router.delete("/resep/:id", auth, async (req, res) => {

    const { id } = req.params;

    try {
        let resep = await Resep.findOne({ _id: id });
        console.log(resep);
        if (!resep) {
            return res.status(400).json({ errors: [{ msg: "Kategori tidak ditemukan" }] });
        }
        await resep.remove();

        res.send("berhasil");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error...");
    }
});

router.get("/resep/alldata", async (req, res) => {
    try { 
        let resep = await Resep.paginate({ status:"Yes" }, { populate: ["kategori", "bahan.id_bahan"]});
        console.log(resep);
        res.json(resep.docs);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error...");
    }
});


module.exports = router;
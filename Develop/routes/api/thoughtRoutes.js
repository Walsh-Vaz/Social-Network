const router = require("express").Router();

const {getThoughts, getThoughtById, createThought, updateThought} = require("../../controllers/thoughtController");


router.route("/").get(getThoughts).post(createThought);

router.route("/:id").get(getThoughtById).put(updateThought);

module.exports = router;
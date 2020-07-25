const recipeModel = require("../models/recipe_model");
const express = require("express");
const router = express.Router();

// Get all recipe
router.get("/", async (req, res, next) => {
    try {
        const result = await recipeModel.get();
        return res.json(result);
    } catch (e) {
        return next(e);
    }
});

// Get one recipe
router.get("/:id", async (req, res, next) => {
    try {
        const result = await recipeModel.getById(req.params.id);
        if (!result) return res.sendStatus(404);
        return res.json(result);
    } catch (e) {
        return next(e);
    }
});

// Create a new recipe
router.post("/", async (req, res, next) => {
    try {
        const result = await recipeModel.create(req.body);
        if (!result) return res.sendStatus(409);
        return res.status(201).json(result);
    } catch (e) {
        return next(e);
    }
});

// Delete a recipe
router.delete("/:id", async (req, res, next) => {
    try {
        const result = await recipeModel.delete(req.params.id);
        if (!result) return res.sendStatus(404);
        return res.sendStatus(200);
    } catch (e) {
        return next(e);
    }
});

// Update a recipe
router.patch("/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;

        const doc = await recipeModel.getById(id);
        if (!doc) return res.sendStatus(404);

        // Merge existing fields with the ones to be updated
        Object.keys(data).forEach((key) => (doc[key] = data[key]));

        const updateResult = await recipeModel.update(id, doc);
        if (!updateResult) return res.sendStatus(404);

        return res.json(doc);
    } catch (e) {
        return next(e);
    }
});

// Replace a recipe
router.put("/:id", async (req, res, next) => {
    try {
        const updateResult = await recipeModel.update(req.params.id, req.body);
        if (!updateResult) return res.sendStatus(404);

        const result = await recipeModel.getById(req.params.id);
        return res.json(result);
    } catch (e) {
        return next(e);
    }
});

module.exports = router;
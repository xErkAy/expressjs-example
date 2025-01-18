import express from "express";
import { formDataParser } from "../../utils/parsers.js";
import * as exceptions from "../../utils/exceptions.js";
import * as settings from '../../configs/settings.js'
import fs from 'node:fs'

const router = express.Router();

router.get('/test/', async (req, res, next) => {
    await res.status(200)
        .json({'test': 123});
});

router.post('/upload/', formDataParser.single('file'), async (req, res, next) => {
    if (!req.file) return next(new exceptions.CustomErrorMessage('No file provided'))

    await fs.writeFile(`${settings.staticDir.shortPath}${req.file.originalname}`, req.file.buffer, async err => {
        if (err) {
            return next(new exceptions.CustomErrorMessage('Error occurred while creating a file'))
        } else {
            await res.status(200)
            .json({'test': 123});
        }
    });
});

router.get('/download/', async (req, res, next) => {
    const filename = req.query?.name
    if (!filename) return next(new exceptions.CustomErrorMessage('No filename provided'))

    await fs.readFile(`${settings.staticDir.fullPath}${filename}`, async (err, data) => {
        if (err) return next(new exceptions.CustomErrorMessage('File does not exist'))
        await res.sendFile(`${settings.staticDir.fullPath}${filename}`)
    })

});

export default router
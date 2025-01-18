import express from 'express'
import * as exceptions from "../../utils/exceptions.js";
import { prisma } from "../../../index.js";

import { validationResult } from 'express-validator'
import { authValidator, registerValidator } from "./serializers.js";
import {comparePasswords, getHashedPassword} from "../../utils/passwords.js";
import { encodeToken } from "../../utils/jwt.js";

const router = express.Router();

router.post('/auth/', authValidator, async (req, res, next) => {
    if (!validationResult(req).isEmpty())
        return next(new exceptions.CustomErrorMessage('Invalid data provided'));

    try {
        const user = await prisma.user.findFirst({
            where: {
                username: req.body.username,
            }
        })
        if (!user)
            return next(new exceptions.CustomErrorMessage('The user does not exists'))

        if (!await comparePasswords(req.body.password, user.password))
            return next(new exceptions.CustomErrorMessage('Invalid password'))

        const payload = {
            ...user
        }
        delete payload.password

        await res.status(200).json({
            ...payload,
            token: encodeToken(payload)
        })
    } catch (e) {
        return next(new exceptions.CustomErrorMessage('Error occurred while authenticating'))
    }
});

router.post('/auth/sign-up/', registerValidator, async (req, res, next) => {
    if (!validationResult(req).isEmpty())
        return next(new exceptions.CustomErrorMessage('Invalid data provided'));

    if (await prisma.user.findFirst({
        where: {
            OR: [
                { username: req.body.username },
                { email: req.body.email }
            ],
        }
    }))
        return next(new exceptions.CustomErrorMessage('The user already exists'))

    await prisma.user.create({
        data: {
            username: req.body.username,
            email: req.body.email,
            password: await getHashedPassword(req.body.password),
        }
    })
    await res.status(201).send()
});

export default router
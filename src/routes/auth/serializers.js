import { check } from 'express-validator'

export const authValidator = [
  check('username', 'Enter a username').not().isEmpty(),
  check('password', 'Enter a password').not().isEmpty(),
]

export const registerValidator = [
  check('username', 'Enter a username').not().isEmpty(),
  check('email', 'Enter an email').not().isEmpty(),
  check('email', 'Enter an email').isEmail(),
  check('password', 'Enter a password').not().isEmpty(),
]

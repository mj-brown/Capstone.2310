const express = require('express');

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const router = express.Router();
const { addUser, deleteUser, updateUser, getAllUsers, getUserById, getUserByUsername } = require('../db/db_methods');
const SALT_COUNT = 10;

// GET /users
router.get('/', async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.send({ users });
    } catch (error) {
        next(error);
    }
});

// GET /users/:user_id
router.get('/:user_id', async (req, res, next) => {
    try {
        const user = await getUserById(req.params.user_id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.send({ user });
        }
    } catch (error) {
        next(error);
    }
});

//GET /users/:username
router.get('/:username', async (req, res, next) => {
    try {
        const user = await getUserByUsername(req.params.username);
        if (!user) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.send({ user });
        }
    } catch (error) {
        next(error);
    }
});

// PATCH /users/:user_id
router.patch('/:user_id', async (req, res, next) => {
    try {
        const user = await updateUser(req.params.user_id, req.body);
        if (!user) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.send({ user });
        }
    } catch (error) {
        next(error);
    }
});

// DELETE /users/:user_id
router.delete('/:user_id', async (req, res, next) => {
    try {
        const user = await deleteUser(req.params.user_id);
        if (!user) {
            res.status(404).send({ message: 'User not found' });
        } else {
            res.send({ user });
        }
    } catch (error) {
        next(error);
    }
});

// POST /users/login
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await getUserByUsername(username);
        if (!user || password !== user.password) {
            return res.status(401).json({ message: 'Invalid username or password' });
        } else {
            const token = jwt.sign({ user_id: user.user_id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ message: 'Login Successful', token });
        }
    } catch (error) {
        next(error);
    }
});

// POST /users/register
router.post('/register', async (req, res, next) => {
    try {
        const { username, password, email } = req.body;
        console.log(req.body);
        const existingUser = await getUserByUsername(username);
        console.log("user", existingUser)
        if (existingUser) {
            return res.status(401).json({ message: 'Username already exists' });
        }
        const newUser = await addUser({ username, password, email });
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
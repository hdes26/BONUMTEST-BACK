import { response, request } from "express";
import { createService, listByIdService, listService, removeService, updateService } from "../service/user.service";




export const getUsers = async (req = request, res = response) => {
    try {
        let users = await listService();
        res.json(users);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: error });
    }
};

export const getUser = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        let user = await listByIdService(id);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: error });
    }
};

export const createUser = async (req = request, res = response) => {
    try {
        let user = await createService(req.body);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: error });
    }
};
export const updateUser = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        let user = await updateService(id, req.body);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: error });
    }
};

export const deleteUser = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        let user = await removeService(id);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(404).json({ msg: error });
    }
};
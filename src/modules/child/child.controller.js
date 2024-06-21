import { ChildModel } from '../../../database/models/child.model.js';

export const addChild = async (req, res) => {
    try {
        const { name, age, weight, height, SpO2, heartRate, parentId } = req.body;
        const newChild = await ChildModel.create({ name, age, weight, height, SpO2, heartRate, parentId });
        res.status(201).json({ message: "Child added successfully", data: newChild });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getChildren = async (req, res) => {
    try {
        const children = await ChildModel.find().populate('parentId', 'name');
        res.status(200).json({ message: "Success", data: children });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getChildById = async (req, res) => {
    try {
        const { id } = req.params;
        const child = await ChildModel.findById(id).populate('parentId', 'name');
        if (child) {
            res.status(200).json({ message: "Success", data: child });
        } else {
            res.status(404).json({ message: "Child not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateChild = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, weight, height, SpO2, heartRate, parentId } = req.body;
        const updatedChild = await ChildModel.findByIdAndUpdate(id, { name, age, weight, height, SpO2, heartRate, parentId }, { new: true });
        if (updatedChild) {
            res.status(200).json({ message: "Child updated successfully", data: updatedChild });
        } else {
            res.status(404).json({ message: "Child not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteChild = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedChild = await ChildModel.findByIdAndDelete(id);
        if (deletedChild) {
            res.status(200).json({ message: "Child deleted successfully", data: deletedChild });
        } else {
            res.status(404).json({ message: "Child not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

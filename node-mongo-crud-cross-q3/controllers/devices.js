const HTTP_STATUS = require('../utils/httpStatus');
const Device = require('./../models/device');
const { success, failure } = require('../utils/commonResponse');
const { validationResult } = require('express-validator');

const getDevices = async (req, res, next) => {
    const devices = await Device.find().exec();
    return res.status(HTTP_STATUS.OK).send(success('All devices are fetched successfully!', devices));
}
const createDevice = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
    }
    try {
        console.log(req.file);
        const createdDevice = new Device({
            title: req.body.title,
            ram: req.body.ram,
            price: req.body.price,
            color: req.body.color,
            imageUrl: process.env.IMAGE_BASE_URL + req.file.filename
        })
        const result = await createdDevice.save();
        return res.status(HTTP_STATUS.OK).send(success('Device is created successfully!', result));

    } catch (error) {
        console.log(error);
        next(error);
    }

}
const getDeviceById = async (req, res, next) => {
    const deviceId = req.params.deviceId;
    let device;
    try {
        device = await Device.findById(deviceId);
        if (!device) {
            return res.status(HTTP_STATUS.BAD_REQUEST).send(failure('Device is not found!'));
        }
        return res.status(HTTP_STATUS.OK).send(success('Device is fetched successfully!', device));
    } catch (error) {
        console.log(error);
        next(error);
    }

}
const updateDevice = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        const deviceId = req.params.deviceId;
        const updatedDevice = await Device.findById(deviceId);

        if (!errors.isEmpty()) {
            return res.status(HTTP_STATUS.UNPROCESSABLE_ENTITY).send(failure('Invalid Inputs', errors.array()));
        }

        if (updatedDevice) {
            updatedDevice.title = req.body.title ? req.body.title : updatedDevice.title;
            updatedDevice.ram = req.body.ram ? req.body.ram : updatedDevice.ram;
            updatedDevice.color = req.body.color ? req.body.color : updatedDevice.color;
            updatedDevice.price = req.body.price ? req.body.price : updatedDevice.price;
            updatedDevice.imageUrl = req.file ? process.env.IMAGE_BASE_URL + req.file.filename : updatedDevice.imageUrl;

            await updatedDevice.save();
            return res.status(HTTP_STATUS.OK).send(success('Device is updated successfully!', updatedDevice));
        }
        return res.status(HTTP_STATUS.NOT_FOUND).send(failure('Device is not found to update'))


    } catch (error) {
        console.log(error);
        next(error);
    }
}
const deleteDevice = async (req, res, next) => {
    try {
        const deviceId = req.params.deviceId;
        await Device.findByIdAndDelete(deviceId).exec();
        return res.status(HTTP_STATUS.OK).send(success('Device is deleted successfully!'));
    } catch (error) {
        next(error);
    }
}

exports.createDevice = createDevice;
exports.getDevices = getDevices;
exports.getDeviceById = getDeviceById;
exports.updateDevice = updateDevice;
exports.deleteDevice = deleteDevice;


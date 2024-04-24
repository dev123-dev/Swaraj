const fs = require("fs");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const { filterObj } = require("./helperFunctions");

//* Get model name *************************************************

const modelName = (Model) => Model.collection.modelName.toLowerCase();
const collectionName = (Model) => Model.collection.collectionName;

//* Factory functions **********************************************
//* Get All docs ***************************************************

exports.getAll = (Model, popOptions, pop2) =>
  catchAsync(async (req, res, next) => {
    const { institution, role } = req.user;

    // Search Box functionality
    let searchArr;
    if (req.query.searchTerms) {
      const searchTerms = req.query.searchTerms.split(",");
      searchArr = searchTerms.map((el) => ({
        [el]: {
          $regex: `^${req.query.keyword}`,
          $options: "i",
        },
      }));
    }

    const instituteObj =
      role === "Super Admin" ||
      ["template", "generic", "color", "ota"].includes(modelName(Model))
        ? {}
        : { institution };

    const filter =
      searchArr && req.query.keyword
        ? {
            $and: [
              instituteObj,
              {
                $or: [...searchArr],
              },
            ],
          }
        : instituteObj;

    let select;
    if (modelName(Model) === "user") {
      select = "-password -passwordChangedAt -refreshTokens";
    }

    // Filter, sort, limiting
    const features = new APIFeatures(
      Model.find(filter).select(select).populate(popOptions).populate(pop2),
      req.query
    )
      .filter()
      .sort()
      .limitFields();

    const docs = await features.query;

    // Paginate
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 100;
    const limitedDocs = docs.slice((page - 1) * limit, page * limit);

    res.status(200).json({
      status: "SUCCESS",
      total: docs.length,
      results: limitedDocs.length,
      data: {
        [`${collectionName(Model)}`]: limitedDocs,
      },
    });
  });

//* Get doc By Id **************************************************

exports.getById = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let select;
    if (modelName(Model) === "user") {
      select = "-password -passwordChangedAt -refreshTokens";
    }

    const doc = await Model.findById(req.params.id)
      .select(select)
      .populate(popOptions);

    if (!doc) {
      return next(
        new AppError(`No ${modelName(Model)} found with the provided ID`, 404)
      );
    }

    if (modelName(Model) === "institution") {
      if (doc.invoice.year !== new Date().getFullYear()) {
        doc.invoice.year = new Date().getFullYear();
        doc.invoice.counter = 1;
      }
      if (doc.grc.year !== new Date().getFullYear()) {
        doc.grc.year = new Date().getFullYear();
        doc.grc.counter = 1;
      }
      if (doc.receipt.year !== new Date().getFullYear()) {
        doc.receipt.year = new Date().getFullYear();
        doc.receipt.counter = 1;
      }
      await doc.save();
    }

    res.status(200).json({
      status: "SUCCESS",
      data: {
        [modelName(Model)]: doc,
      },
    });
  });

//* Create doc *****************************************************

exports.create = (Model) =>
  catchAsync(async (req, res, next) => {
    req.body.createdAt = new Date();

    const doc = new Model(req.body);
    await doc.save();
    res.status(201).json({
      status: "SUCCESS",
      data: {
        [modelName(Model)]: doc,
      },
    });
  });

//* Update doc By Id ***********************************************

exports.updateById = (Model, allowedFields) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(
        new AppError(`No ${modelName(Model)} found with the provided ID`, 404)
      );
    }

    if (modelName(Model) === "user") {
      if (doc.photo && doc.photo !== req.body.photo)
        fs.unlink(`uploads/users/${doc.photo}`, (error) => {
          console.log(error);
        });
    }

    if (modelName(Model) === "institution") {
      if (doc.logo && doc.logo !== req.body.logo)
        fs.unlink(`uploads/logos/${doc.logo}`, (error) => {
          console.log(error);
        });
    }

    const filteredBody = allowedFields
      ? filterObj(req.body, allowedFields)
      : req.body;

    doc.set(filteredBody);
    await doc.save({ validateModifiedOnly: true });

    res.status(200).json({ status: "SUCCESS" });
  });

//* Delete doc By Id ***********************************************

exports.deleteById = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (modelName(Model) === "user") {
      if (doc.photo)
        fs.unlink(`uploads/users/${doc.photo}`, (error) => {
          console.log(error);
        });
    }

    if (modelName(Model) === "institution") {
      if (doc.logo && doc.logo !== req.body.logo)
        fs.unlink(`uploads/logos/${doc.logo}`, (error) => {
          console.log(error);
        });
    }

    if (!doc) {
      return next(
        new AppError(`No ${modelName(Model)} found with the provided ID`, 404)
      );
    }

    res.status(204).json({
      status: "SUCCESS",
      data: null,
    });
  });

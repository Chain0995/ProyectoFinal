"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imparteRouter = void 0;
const express_1 = __importDefault(require("express"));
const imparteController = __importStar(require("../controllers/imparteController"));
const imparteRouter = express_1.default.Router();
exports.imparteRouter = imparteRouter;
imparteRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newImparte = req.body;
    console.log(req.body);
    imparteController.create(newImparte, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
}));
imparteRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    imparteController.getAll((err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
}));
imparteRouter.get('/:id_p/:cod_a/:grupo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_p = parseInt(req.params.id_p);
    const cod_a = parseInt(req.params.cod_a);
    const grupo = req.params.grupo;
    imparteController.getById(id_p, cod_a, grupo, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        if (!result) {
            return res.status(404).json({ 'message': 'Impartición no encontrada' });
        }
        res.status(result.statusCode).json(result);
    });
}));
imparteRouter.get('/:id_p', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_p = parseInt(req.params.id_p);
    imparteController.getByPro(id_p, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        if (!result) {
            return res.status(404).json({ 'message': 'Impartición no encontrada' });
        }
        res.status(result.statusCode).json(result);
    });
}));
imparteRouter.get('/:cod_a', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cod_a = parseInt(req.params.cod_a);
    imparteController.getByAsi(cod_a, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        if (!result) {
            return res.status(404).json({ 'message': 'Impartición no encontrada' });
        }
        res.status(result.statusCode).json(result);
    });
}));
imparteRouter.put('/:id_p/:cod_a/:grupo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_p, cod_a, grupo } = req.params;
    const updatedImparte = Object.assign(Object.assign({}, req.body), { id_p, cod_a, grupo });
    imparteController.update(updatedImparte, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
}));
imparteRouter.delete('/:id_p/:cod_a/:grupo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_p = parseInt(req.params.id_p);
    const cod_a = parseInt(req.params.cod_a);
    const grupo = req.params.grupo;
    imparteController.remove(id_p, cod_a, grupo, (err, result) => {
        if (err) {
            return res.status(500).json({ 'message': err.message });
        }
        res.status(result.statusCode).json(result);
    });
}));

"use strict";
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
const axios_1 = __importDefault(require("axios"));
const react_1 = require("react");
const useApi = (baseURL) => {
    const [loaded, setLoaded] = (0, react_1.useState)(false);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [data, setData] = (0, react_1.useState)();
    const axiosInstance = axios_1.default.create({
        baseURL,
    });
    (0, react_1.useEffect)(() => {
        if (data) {
            setLoaded(true);
            setLoading(false);
        }
    }, [data]);
    const refresh = () => {
        setLoaded(false);
        setLoading(false);
        setData(undefined);
    };
    const fetch = (endpoint, forceRefresh) => __awaiter(void 0, void 0, void 0, function* () {
        if (loaded && !forceRefresh) {
            return data;
        }
        setLoading(true);
        return yield axiosInstance
            .get(endpoint)
            .then((res) => {
            setData(res.data);
            return res.data;
        })
            .catch((err) => {
            console.error(err);
            setLoading(false);
            return;
        });
    });
    const get = () => {
        return data;
    };
    return {
        loaded,
        loading,
        data,
        refresh,
        fetch,
        get,
    };
};
exports.default = useApi;

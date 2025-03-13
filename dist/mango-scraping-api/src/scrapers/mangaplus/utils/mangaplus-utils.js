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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MangaplusUtils = void 0;
const CommonLangs_1 = require("../../../../../shared/src/config/enums/CommonLangs");
const proto_managing_1 = require("../../../utils/proto-managing");
var MangaplusUtils;
(function (MangaplusUtils) {
    function decodeJsonFromMangaPlusRequest(httpUrl, protoFilePath, protoClassName) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield proto_managing_1.ProtoManaging.httpGetProtoFile(httpUrl);
            const Message = yield proto_managing_1.ProtoManaging.loadProtoFileAsync(protoFilePath, protoClassName);
            return proto_managing_1.ProtoManaging.decodeToJson(Message, res);
        });
    }
    MangaplusUtils.decodeJsonFromMangaPlusRequest = decodeJsonFromMangaPlusRequest;
    function decodeImageMangaPlus(imageBuffer, encryption_key) {
        const decodedKey = hex2Bin(encryption_key);
        const arr = new Uint8Array(imageBuffer);
        for (let i = 0; i < arr.length; i++) {
            arr[i] ^= decodedKey[i % decodedKey.length];
        }
        return Buffer.from(arr);
    }
    MangaplusUtils.decodeImageMangaPlus = decodeImageMangaPlus;
    function hex2Bin(hex) {
        return new Uint8Array(hex.match(/.{1,2}/g).map((t) => parseInt(t, 16)));
    }
    MangaplusUtils.hex2Bin = hex2Bin;
    function convertMangaplusLangToCommonLang(lang) {
        if (Object.keys(CommonLangs_1.CommonLangs).includes(lang)) {
            return CommonLangs_1.CommonLangs[lang];
        }
        return CommonLangs_1.CommonLangs.ENGLISH;
    }
    MangaplusUtils.convertMangaplusLangToCommonLang = convertMangaplusLangToCommonLang;
})(MangaplusUtils || (exports.MangaplusUtils = MangaplusUtils = {}));

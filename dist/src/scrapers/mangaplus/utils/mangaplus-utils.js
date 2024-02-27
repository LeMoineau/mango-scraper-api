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
    // TO DECODE IMAGE VIEWER FROM MANGAPLUS -> IN CLIENT SIDE
    // export function getBlobImageURL(image_url: string, encryption_key: string) {
    //   return new Promise(function (t, n) {
    //     var r = hex2Bin(encryption_key),
    //       i = new XMLHttpRequest();
    //     (i.onreadystatechange = function () {
    //       if (4 === i.readyState)
    //         if (200 === i.status) {
    //           var o = new Uint8Array(i.response);
    //           if (r)
    //             for (var a = r.length, s = 0; s < o.length; s++) o[s] ^= r[s % a];
    //           var u = URL.createObjectURL(
    //             new Blob([o], {
    //               type: "image/jpg",
    //             })
    //           );
    //           t(u);
    //         } else n("We can't load file: " + image_url + i);
    //     }),
    //       i.open("GET", image_url, !0),
    //       (i.responseType = "arraybuffer"),
    //       i.send();
    //   });
    // }
    // export function hex2Bin(hex: string) {
    //   return new Uint8Array(hex.match(/.{1,2}/g)!.map((t) => parseInt(t, 16)));
    // }
})(MangaplusUtils || (exports.MangaplusUtils = MangaplusUtils = {}));

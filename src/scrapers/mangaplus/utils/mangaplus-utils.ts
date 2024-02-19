import { ProtoManaging } from "../../../utils/proto-managing";
import { JsonObject } from "../../../types/primitives/jsonObject";

export namespace MangaplusUtils {
  export async function decodeJsonFromMangaPlusRequest(
    httpUrl: string,
    protoFilePath: string,
    protoClassName: string
  ): Promise<JsonObject> {
    const res = await ProtoManaging.httpGetProtoFile(httpUrl);
    const Message = await ProtoManaging.loadProtoFileAsync(
      protoFilePath,
      protoClassName
    );
    return ProtoManaging.decodeToJson(Message, res);
  }

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
}

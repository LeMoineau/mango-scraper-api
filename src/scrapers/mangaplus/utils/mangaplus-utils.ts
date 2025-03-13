import { CommonLangs } from "../../../../../shared/src/config/enums/CommonLangs";
import { Lang } from "../../../../../shared/src/types/primitives/Identifiers";
import { ProtoManaging } from "../../../utils/proto-managing";
import { JsonObject } from "@shared/types/primitives/jsonObject";

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

  export function decodeImageMangaPlus(
    imageBuffer: Buffer,
    encryption_key: string
  ): Buffer {
    const decodedKey = hex2Bin(encryption_key);
    const arr = new Uint8Array(imageBuffer);
    for (let i = 0; i < arr.length; i++) {
      arr[i] ^= decodedKey[i % decodedKey.length];
    }
    return Buffer.from(arr);
  }

  export function hex2Bin(hex: string) {
    return new Uint8Array(hex.match(/.{1,2}/g)!.map((t) => parseInt(t, 16)));
  }

  export function convertMangaplusLangToCommonLang(lang: string): Lang {
    if (Object.keys(CommonLangs).includes(lang)) {
      return (CommonLangs as any)[lang];
    }
    return CommonLangs.ENGLISH;
  }
}

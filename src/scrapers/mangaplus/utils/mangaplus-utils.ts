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
}

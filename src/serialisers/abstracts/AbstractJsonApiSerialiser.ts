import { JsonApiDataInterface } from "../../jsonApi/interfaces/JsonApiDataInterface";
import { bufferToUuid } from "../../lib/uuid";
import { JsonApiBuilderInterface } from "../interfaces/JsonApiBuilderInterface";

export abstract class AbstractJsonApiSerialiser
  implements JsonApiBuilderInterface
{
  constructor() {
    this._endpoint =
      Reflect.getMetadata("endpoint", this.constructor) ??
      this.getDefaultType();
    this._id =
      Reflect.getMetadata("id", this.constructor) ?? this.getDefaultId();
  }

  protected getDefaultType(): string {
    return this.type;
  }

  protected getDefaultId(): string {
    return this.id;
  }

  private _endpoint: string;
  private _id: string;

  get type(): string {
    return this.type || this.getDefaultType();
  }

  get id(): string {
    return this._id || this.getDefaultId();
  }

  get endpoint(): string {
    return this._endpoint || this.getDefaultType();
  }

  get endpointParameters(): string {
    return "";
  }

  create(params?: {
    attributes?: any;
    meta?: any;
    links?: any;
    relationships?: any;
  }): JsonApiDataInterface {
    return {
      type: this._endpoint,
      id: (data: any) => {
        return bufferToUuid(data[this.id]);
      },
      attributes: params?.attributes ?? {},
      meta: {
        ...params?.meta,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
      },
      relationships: params?.relationships ?? {},
      links: params?.links ?? {
        self: (data: any) => {
          return `${process.env.API_URL}${this.endpoint}/${bufferToUuid(
            data[this.id],
          )}`;
        },
      },
    };
  }
}

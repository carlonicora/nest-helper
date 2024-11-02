import { JsonApiDataInterface } from "../../jsonApi/interfaces/JsonApiDataInterface";
import { bufferToUuid } from "../../lib/uuid";
import { JsonApiBuilderInterface } from "../interfaces/JsonApiBuilderInterface";

export abstract class AbstractJsonApiSerialiser
  implements JsonApiBuilderInterface
{
  private _endpoint: string;
  private _id: string;
  private _attributes: any = {};
  private _meta: any = {
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  };
  private _links: any = {
    self: (data: any) => {
      return `${process.env.API_URL}${this.endpoint}/${bufferToUuid(
        data[this.id],
      )}`;
    },
  };
  private _relationships: any = {};

  constructor() {
    this._endpoint =
      Reflect.getMetadata("endpoint", this.constructor) ??
      this._getDefaultType();
    this._id =
      Reflect.getMetadata("id", this.constructor) ?? this._getDefaultId();
  }

  private _getDefaultType(): string {
    return this.type;
  }

  private _getDefaultId(): string {
    return this.id;
  }

  get type(): string {
    return this.type || this._getDefaultType();
  }

  get id(): string {
    return this._id || this._getDefaultId();
  }

  get endpoint(): string {
    return this._endpoint || this._getDefaultType();
  }

  get endpointParameters(): string {
    return "";
  }

  set attributes(attributes: any) {
    this._attributes = attributes;
  }

  set meta(meta: any) {
    this._meta = {
      ...this._meta,
      ...meta,
    };
  }

  set links(links: any) {
    this._links = links;
  }

  set relationships(relationships: any) {
    this._relationships = relationships;
  }

  create(): JsonApiDataInterface {
    return {
      type: this._endpoint,
      id: (data: any) => {
        return bufferToUuid(data[this.id]);
      },
      attributes: this._attributes,
      meta: this._meta,
      relationships: this._relationships,
      links: this._links,
    };
  }
}

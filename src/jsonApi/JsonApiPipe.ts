import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ClassConstructor, plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";

@Injectable()
export class JsonApiPipe<T> implements PipeTransform {
  constructor(private readonly classType: new (...args: any[]) => T) {}

  async transform(value: any): Promise<T> {
    return await this._validate(this.classType, value);
  }

  private async _validate<T>(
    type: ClassConstructor<T>,
    jsonApi: any,
  ): Promise<T> {
    const response = plainToClass(type, jsonApi);
    const validationErrors = await validate(response as object);

    if (validationErrors.length > 0) {
      const errors = this._extractErrors(validationErrors);
      throw new BadRequestException(errors);
    }

    return response;
  }

  private _extractErrors(
    errors: ValidationError[],
    parentPath: string = "",
  ): string[] {
    let errorMessages: string[] = [];

    function buildPath(error: ValidationError, path: string): string {
      if (!error.children || error.children.length === 0) {
        return path;
      }

      const childPath = error.children
        .map((child) => {
          const key = Object.keys(child.target || {}).find(
            (key) => child.target[key] instanceof Object,
          );
          return key ? `${path}.${key}` : path;
        })
        .join("");

      return childPath;
    }

    errors.forEach((error) => {
      const initialPath = parentPath
        ? `${parentPath}.${error.property}`
        : error.property;
      const fullPath = buildPath(error, initialPath);

      if (error.constraints) {
        Object.values(error.constraints).forEach((message) => {
          errorMessages.push(`${fullPath}: ${message}`);
        });
      }

      if (error.children && error.children.length > 0) {
        errorMessages = errorMessages.concat(
          this._extractErrors(error.children, fullPath),
        );
      }
    });

    return errorMessages;
  }
}

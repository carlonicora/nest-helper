import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ClassConstructor, plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";

@Injectable()
export class JsonApiPipe<T> implements PipeTransform {
  constructor(private readonly classType: new (...args: any[]) => T) {}

  async transform(value: any): Promise<T> {
    // Initialize an instance of the class to get default values for missing properties
    const instance = new this.classType();

    // Transform the incoming value
    const transformedValue = plainToClass(this.classType, value);

    // Ensure all properties from the class instance are present in the transformed value
    const validatedValue = this._ensureAllProperties(
      instance,
      transformedValue,
    );

    // Validate the transformed and completed object
    return await this._validate(this.classType, validatedValue);
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

  private _ensureAllProperties(instance: any, transformed: any): any {
    // Iterate over the instance's properties and ensure they are present in the transformed object
    for (const key of Object.keys(instance)) {
      if (!(key in transformed)) {
        transformed[key] = undefined; // Set missing properties to undefined
      }
    }
    return transformed;
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

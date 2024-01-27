import { HttpException, HttpStatus, ValidationError } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

export class DataValidator {
	static async validateAndTransformDto<T extends object>(dtoClass: new () => T, data: any): Promise<T> {
		const response = plainToClass(dtoClass, data);
		const errors = await validate(response);

		if (errors.length > 0) {
			throw new HttpException(
				{
					message: this._formatErrors(errors),
					error: "A server-side error occurred.",
					statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				},
				HttpStatus.INTERNAL_SERVER_ERROR
			);
		}

		return response;
	}

	private static _formatErrors(errors: ValidationError[], parentPropertyPath = ""): string[] {
		let formattedErrors: string[] = [];

		errors.forEach((error) => {
			const propertyPath = parentPropertyPath ? `${parentPropertyPath}.${error.property}` : error.property;

			if (error.constraints) {
				Object.values(error.constraints).forEach((constraint) => {
					formattedErrors.push(`${propertyPath} ${constraint}`);
				});
			}

			if (error.children && error.children.length > 0) {
				formattedErrors = formattedErrors.concat(this._formatErrors(error.children, propertyPath));
			}
		});

		return formattedErrors;
	}
}

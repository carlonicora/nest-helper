import "reflect-metadata";

export function JsonApiSerialiserOptions(options: {
  endpoint: string;
  id: string;
}) {
  return (target: any) => {
    Reflect.defineMetadata("endpoint", options.endpoint, target);
    Reflect.defineMetadata("id", options.id, target);
  };
}

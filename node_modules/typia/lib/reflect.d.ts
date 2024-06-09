import { IMetadataApplication } from "./schemas/metadata/IMetadataApplication";
/**
 * > You must configure the generic argument `Types`.
 *
 * Metadata Application.
 *
 * Creates a Metadata application which contains the metadata and components.
 *
 * Note that, all of the collection types like Array, Tuple and Objects are
 * stored in the {@link IMetadataApplication.components} property. Also, alias
 * types are stored in the {@link IMetadataApplication.aliases} property, too.
 *
 * @template Types Tuple of target types
 * @returns Metadata application
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function metadata(): never;
/**
 * Metadata Application.
 *
 * Creates a Metadata application which contains the metadata and components.
 *
 * Note that, all of the collection types like Array, Tuple and Objects are
 * stored in the {@link IMetadataApplication.components} property. Also, alias
 * types are stored in the {@link IMetadataApplication.aliases} property, too.
 *
 * @template Types Tuple of target types
 * @returns Metadata application
 *
 * @author Jeongho Nam - https://github.com/samchon
 */
declare function metadata<Types extends unknown[]>(): IMetadataApplication;
declare const metadataPure: typeof metadata;
export { metadataPure as metadata };

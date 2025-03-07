import { Property } from "../entities/property";

export interface PropertyRepository {
  save(property: Property): Promise<void>;
  findById(id: string): Promise<Property | null>;
}

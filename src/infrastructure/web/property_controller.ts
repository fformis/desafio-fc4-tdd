import { CreatePropertyDTO } from "../../application/dtos/create_property_dto";
import { PropertyService } from "../../application/services/property_service";
import { PropertyEntity } from "../persistence/entities/property_entity";
import { Property } from "../../domain/entities/property";
import { Request, Response } from "express";

export class PropertyController {
    private propertyService: PropertyService;

    constructor(propertyService: PropertyService) {
        this.propertyService = propertyService;
    }

    async createProperty(req: Request, res: Response): Promise<Response> {

        if (!req.body.name) {
            return res
                .status(400)
                .json({ message: "O nome da propriedade é obrigatório." });
        }

        if (req.body.maxGuests <= 0) {
            return res
                .status(400)
                .json({ message: "A capacidade máxima deve ser maior que zero." });
        }

        if (!req.body.basePricePerNight) {
            return res
                .status(400)
                .json({ message: "O preço base por noite é obrigatório." });
        }

        const dto: CreatePropertyDTO = {
            name: req.body.name,
            description: req.body.description,
            maxGuests: req.body.maxGuests,
            basePricePerNight: req.body.basePricePerNight
        };

        const property = await this.propertyService.createProperty(dto);

        return res.status(201).json({
            message: "Property created successfully",
            property: property,
        });
    }

}

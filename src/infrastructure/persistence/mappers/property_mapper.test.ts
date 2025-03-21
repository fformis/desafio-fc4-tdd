import { PropertyEntity } from '../entities/property_entity';
import { Property } from '../../../domain/entities/property';
import { PropertyMapper } from './property_mapper';

describe('Property Mapper', () => {

    it('deve converter PropertyEntity em Property corretamente', () => {
        // Arrange
        const propertyEntity = new PropertyEntity();
        propertyEntity.id = '1';
        propertyEntity.name = 'Casa na praia';
        propertyEntity.description = 'Casa maravilhosa na praia';
        propertyEntity.maxGuests = 1;
        propertyEntity.basePricePerNight = 100;

        // Act
        const property = PropertyMapper.toDomain(propertyEntity);

        // Assert
        expect(property.getId()).toBe(propertyEntity.id);
        expect(property.getName()).toBe(propertyEntity.name);
        expect(property.getDescription()).toBe(propertyEntity.description);
        expect(property.getMaxGuests()).toBe(propertyEntity.maxGuests);
        expect(property.getBasePricePerNight()).toBe(propertyEntity.basePricePerNight);
    });

    it('deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity', () => {
        
        const propertyEntity = new PropertyEntity();

        expect(() => PropertyMapper.toDomain(propertyEntity)).toThrow("O campo 'name' é obrigatório");

        propertyEntity.name = 'Casa na praia';
        expect(() => PropertyMapper.toDomain(propertyEntity)).toThrow("O campo 'maxGuests' é obrigatório");

        propertyEntity.maxGuests = 10;
        expect(() => PropertyMapper.toDomain(propertyEntity)).toThrow("O campo 'basePricePerNight' é obrigatório");

        propertyEntity.basePricePerNight = 100;
       
        const property = PropertyMapper.toDomain(propertyEntity);

        // Assert
        expect(property.getId()).toBe(propertyEntity.id);
        expect(property.getName()).toBe(propertyEntity.name);
        expect(property.getDescription()).toBe(propertyEntity.description);
        expect(property.getMaxGuests()).toBe(propertyEntity.maxGuests);
        expect(property.getBasePricePerNight()).toBe(propertyEntity.basePricePerNight);        
    });

    it('deve converter Property para PropertyEntity corretamente', () => {

        // Arrange
        const property = new Property(
            '1',
            'Casa na praia',
            'Casa maravilhosa na praia',
            10,
            100
        );

        // Act
        const propertyEntity = PropertyMapper.toPersistence(property);

        // Assert
        expect(propertyEntity.id).toBe(property.getId());
        expect(propertyEntity.name).toBe(property.getName());
        expect(propertyEntity.description).toBe(property.getDescription());
        expect(propertyEntity.maxGuests).toBe(property.getMaxGuests());
        expect(propertyEntity.basePricePerNight).toBe(property.getBasePricePerNight());
    });

});
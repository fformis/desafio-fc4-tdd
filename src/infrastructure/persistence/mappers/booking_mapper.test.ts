import { BookingEntity } from "../entities/booking_entity";
import { PropertyEntity } from "../entities/property_entity";
import { UserEntity } from "../entities/user_entity";
import { BookingMapper } from './booking_mapper';

describe("Booking Mapper", () => {

    it("deve converter BookingEntity em Booking corretamente", () => {
        // Arrange
        const propertyEntity = new PropertyEntity();
        propertyEntity.id = '1';
        propertyEntity.name = 'Casa na praia';
        propertyEntity.description = 'Casa maravilhosa na praia';
        propertyEntity.maxGuests = 10;
        propertyEntity.basePricePerNight = 100;

        const userEntity = new UserEntity();
        userEntity.id = '1';
        userEntity.name = 'John Doe';

        const bookingEntity = new BookingEntity();
        bookingEntity.id = '1';
        bookingEntity.property = propertyEntity;
        bookingEntity.guest = userEntity;
        bookingEntity.startDate = new Date(2025, 1, 1);
        bookingEntity.endDate = new Date(2025, 1, 5);
        bookingEntity.guestCount = 5;
        bookingEntity.status = 'CONFIRMED';
        bookingEntity.totalPrice = 500;


        // Act
        const booking = BookingMapper.toDomain(bookingEntity);

        // Assert
        expect(booking.getId()).toBe(bookingEntity.id);
        expect(booking.getDateRange().getStartDate()).toBe(bookingEntity.startDate);
        expect(booking.getDateRange().getEndDate()).toBe(bookingEntity.endDate);
        expect(booking.getTotalPrice()).toBe(bookingEntity.totalPrice);
        expect(booking.getProperty().getId()).toBe(bookingEntity.property.id);
        expect(booking.getProperty().getName()).toBe(bookingEntity.property.name);
        expect(booking.getProperty().getDescription()).toBe(bookingEntity.property.description);
        expect(booking.getProperty().getMaxGuests()).toBe(bookingEntity.property.maxGuests);
        expect(booking.getProperty().getBasePricePerNight()).toBe(bookingEntity.property.basePricePerNight);
        expect(booking.getUser().getId()).toBe(bookingEntity.guest.id);
        expect(booking.getUser().getName()).toBe(bookingEntity.guest.name);

    });

    it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity", () => {
        // Arrange
        const propertyEntity = new PropertyEntity();
        propertyEntity.id = '1';
        propertyEntity.name = 'Casa na praia';
        propertyEntity.description = 'Casa maravilhosa na praia';
        propertyEntity.maxGuests = 10;
        propertyEntity.basePricePerNight = 100;

        const userEntity = new UserEntity();
        userEntity.id = '1';
        userEntity.name = 'John Doe';

        const bookingEntity = new BookingEntity();

        // Act / Assert
        expect(() => BookingMapper.toDomain(bookingEntity)).toThrow("O campo 'guest' é obrigatório");

        bookingEntity.guest = userEntity;
        expect(() => BookingMapper.toDomain(bookingEntity)).toThrow("O campo 'startDate' é obrigatório");

        bookingEntity.startDate = new Date(2025, 1, 1);
        expect(() => BookingMapper.toDomain(bookingEntity)).toThrow("O campo 'endDate' é obrigatório");

        bookingEntity.endDate = new Date(2025, 1, 5);
        expect(() => BookingMapper.toDomain(bookingEntity)).toThrow("O campo 'property' é obrigatório");

        bookingEntity.property = propertyEntity;
        expect(() => BookingMapper.toDomain(bookingEntity)).toThrow("O campo 'guestCount' é obrigatório");

        bookingEntity.guestCount = 5;
        expect(() => BookingMapper.toDomain(bookingEntity)).toThrow("O campo 'totalPrice' é obrigatório");

        bookingEntity.totalPrice = 500;
        expect(() => BookingMapper.toDomain(bookingEntity)).toThrow("O campo 'status' é obrigatório");

        bookingEntity.status = 'CONFIRMED';

        // Act
        const booking = BookingMapper.toDomain(bookingEntity);

        // Assert
        expect(booking.getId()).toBe(bookingEntity.id);
        expect(booking.getDateRange().getStartDate()).toBe(bookingEntity.startDate);
        expect(booking.getDateRange().getEndDate()).toBe(bookingEntity.endDate);
        expect(booking.getTotalPrice()).toBe(bookingEntity.totalPrice);
        expect(booking.getProperty().getId()).toBe(bookingEntity.property.id);
        expect(booking.getProperty().getName()).toBe(bookingEntity.property.name);
        expect(booking.getProperty().getDescription()).toBe(bookingEntity.property.description);
        expect(booking.getProperty().getMaxGuests()).toBe(bookingEntity.property.maxGuests);
        expect(booking.getProperty().getBasePricePerNight()).toBe(bookingEntity.property.basePricePerNight);
        expect(booking.getUser().getId()).toBe(bookingEntity.guest.id);
        expect(booking.getUser().getName()).toBe(bookingEntity.guest.name);
    });

});
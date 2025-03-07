import { Booking } from "../../domain/entities/booking";
import { BookingRepository } from "../../domain/repositories/booking_repository";
import { DateRange } from "../../domain/value_objects/date_range";
import { CreateBookingDTO } from "../dtos/create_booking_dto";
import { PropertyService } from "./property_service";
import { UserService } from "./user_service";
import { v4 as uuidv4 } from "uuid";

export class BookingService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly propertyService: PropertyService,
    private readonly userService: UserService
  ) {}

  async createBooking(dto: CreateBookingDTO): Promise<Booking> {
    const property = await this.propertyService.findPropertyById(
      dto.propertyId
    );
    if (!property) {
      throw new Error("Propriedade não encontrada.");
    }

    const guest = await this.userService.findUserById(dto.guestId);
    if (!guest) {
      throw new Error("Usuário não encontrado.");
    }

    const dateRange = new DateRange(dto.startDate, dto.endDate); // altamente acoplado precisa de mock

    const booking = new Booking(
      uuidv4(),
      property,
      guest,
      dateRange,
      dto.guestCount
    );

    await this.bookingRepository.save(booking);
    return booking;
  }

  async cancelBooking(bookingId: string): Promise<void> {
    const booking = await this.bookingRepository.findById(bookingId);

    if (!booking) {
      throw new Error("Reserva não encontrada.");
    }

    booking?.cancel(new Date());
    await this.bookingRepository.save(booking!);
  }
}

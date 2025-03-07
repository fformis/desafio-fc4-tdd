import { CreateBookingDTO } from "../../application/dtos/create_booking_dto";
import { BookingService } from "../../application/services/booking_service";
import { Request, Response } from "express";

export class BookingController {
  private bookingService: BookingService;

  constructor(bookingService: BookingService) {
    this.bookingService = bookingService;
  }

  async createBooking(req: Request, res: Response): Promise<Response> {
    try {
      const startDate = new Date(req.body.startDate);
      const endDate = new Date(req.body.endDate);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return res
          .status(400)
          .json({ message: "Data de início ou fim inválida." });
      }

      const dto: CreateBookingDTO = {
        propertyId: req.body.propertyId,
        guestId: req.body.userId,
        startDate: startDate,
        endDate: endDate,
        guestCount: req.body.guestCount,
      };

      const booking = await this.bookingService.createBooking(dto);

      return res.status(201).json({
        message: "Booking created successfully",
        booking: {
          id: booking.getId(),
          propertyId: booking.getProperty().getId(),
          guestId: booking.getGuest().getId(),
          startDate: booking.getDateRange().getStartDate(),
          endDate: booking.getDateRange().getEndDate(),
          guestCount: booking.getGuestCount(),
          totalPrice: booking.getTotalPrice(),
          status: booking.getStatus(),
        },
      });
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "An unexpected error occurred" });
    }
  }

  async cancelBooking(req: Request, res: Response): Promise<Response> {
    try {
      const bookingId = req.params.id;
      await this.bookingService.cancelBooking(bookingId);

      return res
        .status(200)
        .json({ message: "Reserva cancelada com sucesso." });
    } catch (error: any) {
      return res.status(400).json({ message: "Reserva não encontrada." });
    }
  }
}

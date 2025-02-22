import prisma from "../lib/prisma.js";

export const bookingHall = async (req, res) => {
    const body = req.body;

    try {

        const requiredFields = ["id", "startTime", "endTime", "fullName", "email", "phone", "guestCount"];
        const missingFields = requiredFields.filter((field) => !body[field]);

        if (missingFields.length > 0) {
            return res.status(400).json({ error: `Отсутствуют обязательные поля: ${missingFields.join(", ")}` });
        }

        const hall = await prisma.hall.findUnique({
            where: { id: body.id },
        });

        if (!hall) {
            return res.status(404).json({ error: "Зал не найден" });
        }

        if (!hall.available) {
            return res.status(400).json({ error: "Зал недоступен для бронирования" });
        }

        // Проверяем пересечения бронирований
        const overlappingBookings = await prisma.booking.findMany({
            where: {
                hallId: body.id,
                OR: [
                    { startTime: { lte: body.startTime }, endTime: { gt: body.startTime } },
                    { startTime: { lt: body.endTime }, endTime: { gte: body.endTime } },
                    { startTime: { gte: body.startTime }, endTime: { lte: body.endTime } },
                ],
            },
        });

        if (overlappingBookings.length > 0) {
            return res.status(400).json({ error: "Выбранные даты пересекаются с существующими бронированиями" });
        }

        // Создаем новое бронирование
        const newBooking = await prisma.booking.create({
            data: {
                hallId: body.id,
                startTime: new Date(body.startTime),
                endTime: new Date(body.endTime),
                fullName: body.fullName,
                email: body.email,
                phone: body.phone,
                guestCount: parseInt(body.guestCount, 10),
                message: body.message || null,
            },
        });

        // Обновляем статус зала (isBooked: true)
        await prisma.hall.update({
            where: { id: body.id },
            data: { isBooked: true },
        });

        return res.status(201).json({
            message: "Бронирование успешно создано",
            booking: newBooking,
        });
    } catch (error) {
        console.error("Ошибка при бронировании зала:", error.message);
        return res.status(500).json({ error: "Произошла ошибка при бронировании" });
    }
};


export const getBookedHalls = async (req, res) => {
    try {

        const bookedHalls = await prisma.hall.findMany({
            where: {
                bookings: {
                    some: {},
                },
            },
            include: {
                bookings: true,
            },
        });

        console.log(bookedHalls)
        if (bookedHalls.length === 0) {
            return res.status(200).json({ message: "Нет забронированных залов" });
        }


        return res.status(200).json({
            message: "Список забронированных залов",
            data: bookedHalls,
        });
    } catch (error) {
        console.error("Ошибка при получении забронированных залов:", error.message);
        return res.status(500).json({ error: "Произошла ошибка при получении данных" });
    }
};


export const updateBooking = async (req, res) => {
    const { id } = req.params; // ID бронирования
    const body = req.body; // Новые данные для обновления

    try {
        // Проверяем, существует ли бронирование
        const existingBooking = await prisma.booking.findUnique({
            where: { id },
        });

        if (!existingBooking) {
            return res.status(404).json({ error: "Бронирование не найдено" });
        }

        // Проверяем пересечения с другими бронированиями
        const overlappingBookings = await prisma.booking.findMany({
            where: {
                hallId: existingBooking.hallId,
                id: { not: id }, // Исключаем текущее бронирование
                OR: [
                    { startTime: { lte: body.startTime }, endTime: { gt: body.startTime } },
                    { startTime: { lt: body.endTime }, endTime: { gte: body.endTime } },
                    { startTime: { gte: body.startTime }, endTime: { lte: body.endTime } },
                ],
            },
        });

        if (overlappingBookings.length > 0) {
            return res.status(400).json({ error: "Выбранные даты пересекаются с существующими бронированиями" });
        }

        // Обновляем бронирование
        const updatedBooking = await prisma.booking.update({
            where: { id },
            data: {
                startTime: body.startTime ? new Date(body.startTime) : existingBooking.startTime,
                endTime: body.endTime ? new Date(body.endTime) : existingBooking.endTime,
                fullName: body.fullName || existingBooking.fullName,
                email: body.email || existingBooking.email,
                phone: body.phone || existingBooking.phone,
                guestCount: body.guestCount ? parseInt(body.guestCount, 10) : existingBooking.guestCount,
                message: body.message || existingBooking.message,
            },
        });

        return res.status(200).json({
            message: "Бронирование успешно обновлено",
            booking: updatedBooking,
        });
    } catch (error) {
        console.error("Ошибка при обновлении бронирования:", error.message);
        return res.status(500).json({ error: "Произошла ошибка при обновлении бронирования" });
    }
};

export const deleteBooking = async (req, res) => {
    const { id } = req.params;

    try {

        const existingBooking = await prisma.booking.findUnique({
            where: { id },
        });

        if (!existingBooking) {
            return res.status(404).json({ error: "Бронирование не найдено" });
        }


        await prisma.booking.delete({
            where: { id },
        });


        const remainingBookings = await prisma.booking.findMany({
            where: { hallId: existingBooking.hallId },
        });


        if (remainingBookings.length === 0) {
            await prisma.hall.update({
                where: { id: existingBooking.hallId },
                data: { isBooked: false },
            });
        }

        return res.status(200).json({
            message: "Бронирование успешно удалено",
        });
    } catch (error) {
        console.error("Ошибка при удалении бронирования:", error.message);
        return res.status(500).json({ error: "Произошла ошибка при удалении бронирования" });
    }
};
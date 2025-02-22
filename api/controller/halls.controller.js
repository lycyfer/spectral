import prisma from "../lib/prisma.js";


export const addHalls = async (req, res) => {
    const body = req.body;

    try {
        const newHall = await prisma.hall.create({
            data: {
                name: body.name,
                capacity: body.capacity ?? 0, // Текущая вместимость (если нужно)
                maxCapacity: body.maxCapacity, // Максимальная вместимость
                price: body.price,
                description: body.description,
                available: body.available ?? true,
                imageUrls: body.imageUrls ?? [],
                hallType: body.hallType,
                equipment: body.equipment ?? [],
                location: body.location,
                floor: body.floor ?? 1,
                companyName: body.companyName,
                companyId: body.companyId,
                eventType: body.eventType ?? [], // Тип мероприятия
                availableDates: body.availableDates ?? [], // Доступные даты и время
                minBookingDuration: body.minBookingDuration ?? 1, // Минимальное время бронирования
                maxBookingDuration: body.maxBookingDuration ?? 24, // Максимальное время бронирования
                additionalServices: body.additionalServices ?? [], // Дополнительные услуги
                usageRules: body.usageRules ?? "", // Правила использования
                rating: body.rating ?? 0, // Рейтинг зала
                reviewCount: body.reviewCount ?? 0, // Количество отзывов
                interiorPhotos: body.interiorPhotos ?? [], // Фотографии интерьера
                contactInfo: body.contactInfo ?? "", // Контакты для бронирования
                cancellationPolicy: body.cancellationPolicy ?? "", // Условия отмены бронирования
                accessibleForDisabled: body.accessibleForDisabled ?? false, // Доступность для людей с ограниченными возможностями
                parkingAvailable: body.parkingAvailable ?? false, // Парковка
                wifiAvailable: body.wifiAvailable ?? false, // Wi-Fi
                kitchenAvailable: body.kitchenAvailable ?? false, // Кухня
                smokingArea: body.smokingArea ?? false, // Зона для курения
                additionalFees: body.additionalFees ?? 0, // Дополнительные расходы
                preparationTime: body.preparationTime ?? 1, // Время подготовки зала
                cleaningTime: body.cleaningTime ?? 1, // Время уборки
                childFriendly: body.childFriendly ?? false, // Доступность для детей
            },
        });

        res.status(200).json(newHall);
    } catch (err) {
        console.error("Ошибка при добавлении зала:", err);
        res.status(500).json({ message: "Произошла ошибка при добавлении зала" });
    }
};

export const getHalls = async (req, res) => {
    try {
        const halls = await prisma.hall.findMany()
        // console.log(halls)
        res.status(200).json(halls)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "failed to get halls" })
    }
}

export const getHallsById = async (req, res) => {
    const { id } = req.params;
    // console.log(id);

    if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "Invalid ID" });
    }

    try {
        const hall = await prisma.hall.findUnique({
            where: { id: id }
        });

        if (!hall) {
            return res.status(404).json({ message: "Hall not found" });
        }

        // console.log(hall);
        res.status(200).json(hall);
    } catch (err) {
        console.error("Error fetching hall:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteHallById = async (req, res) => {
    const { id } = req.params;

    try {

        const hall = await prisma.hall.findUnique({
            where: { id }
        })

        await prisma.hall.delete({
            where: { id }
        })
        res.status(200).json({ message: "hall deleted" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "failed ti delete post" })
    }

}

export const editHall = async (req, res) => {
    const { id } = req.params; // Получаем ID зала из параметров запроса
    const body = req.body; // Получаем данные для обновления из тела запроса

    if (!id || typeof id !== "string") {
        return res.status(400).json({ message: "Invalid ID" });
    }

    try {
        // Проверяем, существует ли зал с таким ID
        const existingHall = await prisma.hall.findUnique({
            where: { id },
        });

        if (!existingHall) {
            return res.status(404).json({ message: "Hall not found" });
        }

        // Обновляем зал
        const updatedHall = await prisma.hall.update({
            where: { id }, // Указываем ID зала для обновления
            data: {
                name: body.name ?? existingHall.name,
                capacity: body.capacity ?? existingHall.capacity,
                maxCapacity: body.maxCapacity ?? existingHall.maxCapacity,
                price: body.price ?? existingHall.price,
                description: body.description ?? existingHall.description,
                available: body.available ?? existingHall.available,
                imageUrls: body.imageUrls ?? existingHall.imageUrls,
                hallType: body.hallType ?? existingHall.hallType,
                equipment: body.equipment ?? existingHall.equipment,
                location: body.location ?? existingHall.location,
                floor: body.floor ?? existingHall.floor,
                companyName: body.companyName ?? existingHall.companyName,
                companyId: body.companyId ?? existingHall.companyId,
                eventType: body.eventType ?? existingHall.eventType,
                availableDates: body.availableDates ?? existingHall.availableDates,
                minBookingDuration: body.minBookingDuration ?? existingHall.minBookingDuration,
                maxBookingDuration: body.maxBookingDuration ?? existingHall.maxBookingDuration,
                additionalServices: body.additionalServices ?? existingHall.additionalServices,
                usageRules: body.usageRules ?? existingHall.usageRules,
                rating: body.rating ?? existingHall.rating,
                reviewCount: body.reviewCount ?? existingHall.reviewCount,
                interiorPhotos: body.interiorPhotos ?? existingHall.interiorPhotos,
                contactInfo: body.contactInfo ?? existingHall.contactInfo,
                cancellationPolicy: body.cancellationPolicy ?? existingHall.cancellationPolicy,
                accessibleForDisabled: body.accessibleForDisabled ?? existingHall.accessibleForDisabled,
                parkingAvailable: body.parkingAvailable ?? existingHall.parkingAvailable,
                wifiAvailable: body.wifiAvailable ?? existingHall.wifiAvailable,
                kitchenAvailable: body.kitchenAvailable ?? existingHall.kitchenAvailable,
                smokingArea: body.smokingArea ?? existingHall.smokingArea,
                additionalFees: body.additionalFees ?? existingHall.additionalFees,
                preparationTime: body.preparationTime ?? existingHall.preparationTime,
                cleaningTime: body.cleaningTime ?? existingHall.cleaningTime,
                childFriendly: body.childFriendly ?? existingHall.childFriendly,
            },
        });

        res.status(200).json(updatedHall);
    } catch (err) {
        console.error("Ошибка при редактировании зала:", err);
        res.status(500).json({ message: "Произошла ошибка при редактировании зала" });
    }
};
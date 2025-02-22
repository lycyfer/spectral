import React, { useState } from "react";
import Calendar from "../calendar/calendar";
import apiRequest from "../../lib/apiRequest";

const Modal = ({ isOpen, onClose, halls }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isAvailable, setIsAvailable] = useState(null);
  console.log(isOpen, onClose);
  const [formData, setFormData] = useState({
    hallId: "",
    startTimeDate: "",
    startTimeTime: "",
    endTimeDate: "",
    endTimeTime: "",
    fullName: "",
    email: "",
    phone: "",
    guestCount: "",
    message: "",
  });
  const [notification, setNotification] = useState(null);
  const initialState = {
    hallId: "",
    startTimeDate: "",
    startTimeTime: "",
    endTimeDate: "",
    endTimeTime: "",
    fullName: "",
    email: "",
    phone: "",
    guestCount: "",
    message: "",
  };
  // console.log(halls);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Создаем даты начала и окончания
      const startTime = new Date(`${formData.startTimeDate}T${formData.startTimeTime}`);
      const endTime = new Date(`${formData.endTimeDate}T${formData.endTimeTime}`);
  
      if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
        setNotification({ type: "error", message: "Неверный формат даты или времени" });
        return;
      }
  
      if (endTime <= startTime) {
        setNotification({ type: "error", message: "Время окончания должно быть позже времени начала" });
        return;
      }
  
      // Отправляем запрос на сервер
      const response = await apiRequest.post("/booking/hall", {
        id: formData.hallId,
        startTime,
        endTime,
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        guestCount: parseInt(formData.guestCount),
        message: formData.message || null,
      });
  
      console.log(response.status);
      console.log(Boolean(response.ok))
      if (response.status === 201) {
        const data = await response.data;
        console.log(data);

        if (data.booking) {
          setNotification({ type: "success", message: "Бронирование успешно создано!" });
          setFormData({ ...initialState });
          setTimeout(() => {
            onClose();
          }, 1000);
        } else if (data.error) {
          // Если есть error, показываем сообщение об ошибке
          setNotification({ type: "error", message: data.error || "Произошла ошибка при бронировании." });
        } else {
          // Если ни booking, ни error нет, показываем общее сообщение об ошибке
          setNotification({ type: "error", message: "Произошла неизвестная ошибка при бронировании." });
        }
      } else {
        // Если статус не 200/201, показываем сообщение об ошибке
        setNotification({ type: "error", message: "Произошла ошибка при бронировании." });
      }
    } catch (e) {
      console.log("Ошибка:", e);
      setNotification({ type: "error", message: "Произошла ошибка при создании бронирования" });
    }
  

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setIsAvailable(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const checkAvailability = () => {
    const availableTimes = ["10:00", "14:00", "18:00"];
    const isAvailable = availableTimes.includes(selectedTime);
    setIsAvailable(isAvailable);
  };

  if (!isOpen) return null;

  return (
    <div className={isOpen ? "modal-overlay open" : "modal-overlay"}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Выберите дату и время</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-content">
          <div className="booking-form-container">
            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label htmlFor="hall">Зал</label>
                <select
                  id="hall"
                  name="hallId"
                  value={formData.hallId}
                  onChange={handleChange}
                  required
                >
                  <option value="">{halls.name}</option>

                  <option key={halls.id} value={halls.id}>
                    {halls.name}
                  </option>
                </select>
              </div>

              <div className="form-row form-row-flex">
                <div className="form-column">
                  <label htmlFor="start-date">Дата начала</label>
                  <input
                    type="date"
                    id="start-date"
                    name="startTimeDate"
                    value={formData.startTimeDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-column">
                  <label htmlFor="start-time">Время начала</label>
                  <input
                    type="time"
                    id="start-time"
                    name="startTimeTime"
                    value={formData.startTimeTime}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row form-row-flex">
                <div className="form-column">
                  <label htmlFor="end-date">Дата окончания</label>
                  <input
                    type="date"
                    id="end-date"
                    name="endTimeDate"
                    value={formData.endTimeDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-column">
                  <label htmlFor="end-time">Время окончания</label>
                  <input
                    type="time"
                    id="end-time"
                    name="endTimeTime"
                    value={formData.endTimeTime}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <label htmlFor="full-name">Полное имя</label>
                <input
                  type="text"
                  id="full-name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Введите ваше имя"
                  required
                />
              </div>

              <div className="form-row">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Введите ваш email"
                  required
                />
              </div>

              <div className="form-row">
                <label htmlFor="phone">Телефон</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Введите ваш телефон"
                  required
                />
              </div>

              <div className="form-row">
                <label htmlFor="guest-count">Количество посетителей:</label>
                <input
                  type="number"
                  id="guest-count"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  min="1"
                  placeholder="Введите количество гостей"
                  required
                />
              </div>

              <div className="form-row">
                <label htmlFor="message">Сообщение</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Оставьте дополнительные инструкции..."
                ></textarea>
              </div>

              {/* Действия формы */}
              <div className="form-actions">
                <button className="btn-booking" type="submit">
                  Забронировать
                </button>
                <button className="btn-reset" type="reset">
                  Очистить форму
                </button>
              </div>
            </form>
          </div>
          <div className="calendar-container">
            <Calendar onDateSelect={handleDateSelect} />
            {selectedDate && (
              <>
                <div className="time-selection">
                  <h3>Выберите время</h3>
                  <div className="time-buttons">
                    {Array.from({ length: 10 }, (_, i) => {
                      const time = `${10 + i}:00`;
                      return (
                        <button
                          key={time}
                          className={`time-btn ${
                            selectedTime === time ? "selected" : ""
                          }`}
                          onClick={() => handleTimeSelect(time)}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {selectedTime && (
                  <div className="availability-check">
                    <button className="check-btn" onClick={checkAvailability}>
                      Проверить доступность
                    </button>
                    {isAvailable !== null && (
                      <p>
                        {isAvailable
                          ? "Время доступно для бронирования."
                          : "Время занято."}
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {notification && (
          <div
            className={`notification notification-${notification.type}`}
            role="alert"
          >{notification.message}</div>
        )}
      </div>
    </div>
  );
};

export default Modal;

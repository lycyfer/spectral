import { useState } from "react";
import apiRequest from "../../lib/apiRequest";

const EditHall = ({ hall, onSave, onCancel }) => {
  const [formData, setFormData] = useState(hall);

  const handleSubmitForm = async (id) => {
    try {
      const response = await apiRequest.post(`/edit/${id}`, formData);
      if (response.status === 200) {
        onSave(response.data);
      } else {
        console.error("Ошибка при сохранении данных:", response.statusText);
      }
    } catch (err) {
      console.error("Ошибка при отправке запроса:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayChange = (e, field) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: value.split(",").map((item) => item.trim()), // Разделяем строку по запятым
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSubmitForm(hall.id);
    } catch (err) {
      console.error("Ошибка при сохранении данных:", err);
    }
  };

  return (
    <div className="edit-hall">
      <h2>Редактирование зала</h2>
      <form onSubmit={handleSubmit} className="edit-hall-form">

        <div className="form-row">
          <div className="form-group">
            <label>Название</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="styled-input"
            />
          </div>

          <div className="form-group">
            <label>Цена</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="styled-input"
            />
          </div>

          <div className="form-group">
            <label>Макс. вместимость</label>
            <input
              type="number"
              name="maxCapacity"
              value={formData.maxCapacity}
              onChange={handleChange}
              className="styled-input"
            />
          </div>
        </div>

        {/* Второй ряд */}
        <div className="form-row">
          <div className="form-group">
            <label>Тип помещения</label>
            <input
              type="text"
              name="hallType"
              value={formData.hallType}
              onChange={handleChange}
              className="styled-input"
            />
          </div>

          <div className="form-group">
            <label>Расположение</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="styled-input"
            />
          </div>

          <div className="form-group">
            <label>Этаж</label>
            <input
              type="number"
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              className="styled-input"
            />
          </div>
        </div>


        <div className="form-row">
          <div className="form-group">
            <label>Название компании</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="styled-input"
            />
          </div>

          <div className="form-group">
            <label>ID компании</label>
            <input
              type="text"
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              className="styled-input"
            />
          </div>
          <div className="form-group">
            <label>Рейтинг</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="styled-input"
            />
          </div>

          <div className="form-group">
            <label>Количество отзывов</label>
            <input
              type="number"
              name="reviewCount"
              value={formData.reviewCount}
              onChange={handleChange}
              className="styled-input"
            />
          </div>

       
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Мак. время бронирования</label>
            <input
              type="number"
              name="maxBookingDuration"
              value={formData.maxBookingDuration}
              onChange={handleChange}
              className="styled-input"
            />
          </div>
          <div className="form-group">
            <label>Мин. время бронирования</label>
            <input
              type="number"
              name="minBookingDuration"
              value={formData.minBookingDuration}
              onChange={handleChange}
              className="styled-input"
            />
          </div>
          
        </div>

        {/* Пятый ряд */}
        <div className="form-row">
          <div className="form-group">
            <label>Дополнительные услуги</label>
            <input
              type="text"
              value={formData.additionalServices.join(", ")}
              onChange={(e) => handleArrayChange(e, "additionalServices")}
              className="styled-input"
            />
          </div>

          <div className="form-group">
            <label>Типы мероприятий</label>
            <input
              type="text"
              value={formData.eventType.join(", ")}
              onChange={(e) => handleArrayChange(e, "eventType")}
              className="styled-input"
            />
          </div>

          <div className="form-group">
            <label>Оборудование</label>
            <input
              type="text"
              value={formData.equipment.join(", ")}
              onChange={(e) => handleArrayChange(e, "equipment")}
              className="styled-input"
            />
          </div>
        </div>

        {/* Шестой ряд */}
        <div className="form-row">
          <div className="form-group">
            <label>Описание</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="styled-input"
            />
          </div>

          <div className="form-group">
            <label>Правила использования</label>
            <textarea
              name="usageRules"
              value={formData.usageRules}
              onChange={handleChange}
              className="styled-input"
            />
          </div>
        </div>

        {/* Чекбоксы */}
        <div className="form-row">
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="accessibleForDisabled"
                checked={formData.accessibleForDisabled}
                onChange={handleChange}
              />
              Доступно для инвалидов
            </label>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="parkingAvailable"
                checked={formData.parkingAvailable}
                onChange={handleChange}
              />
              Парковка
            </label>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="wifiAvailable"
                checked={formData.wifiAvailable}
                onChange={handleChange}
              />
              Wi-Fi
            </label>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="kitchenAvailable"
                checked={formData.kitchenAvailable}
                onChange={handleChange}
              />
              Кухня
            </label>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="smokingArea"
                checked={formData.smokingArea}
                onChange={handleChange}
              />
              Зона для курения
            </label>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="childFriendly"
                checked={formData.childFriendly}
                onChange={handleChange}
              />
              Подходит для детей
            </label>
          </div>
        </div>


        <div className="form-actions">
          <button type="submit" className="save-button">
            Сохранить
          </button>
          <button type="button" onClick={onCancel} className="cancel-button">
            Закрыть
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditHall;
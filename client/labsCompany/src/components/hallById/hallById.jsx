import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import emailjs from "emailjs-com";
import Search from "../search/search";
import Modal from "../modal/modal";

const HallById = () => {
  const data = useLoaderData();
  const [hall, setHall] = useState(data.hallsResponse.data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleBookingDetailsClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleBookingCheck = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const checkAvailability = () => {
    const isAvailable = hall.availableDates.includes(selectedDate);
    console.log(isAvailable);
  };

  console.log(hall);
  return (
    <div className="single-hall">
      <div className="single-hall-header">
        <div className="hall-header-left">
          <div className="hall-header-left-icon">
            <svg
              fill="#fff"
              width="40px"
              height="40px"
              viewBox="0 0 50 50"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <path d="M8 2L8 6L4 6L4 48L15 48L15 39L19 39L19 48L30 48L30 6L26 6L26 2 Z M 10 10L12 10L12 12L10 12 Z M 14 10L16 10L16 12L14 12 Z M 18 10L20 10L20 12L18 12 Z M 22 10L24 10L24 12L22 12 Z M 32 14L32 18L34 18L34 20L32 20L32 22L34 22L34 24L32 24L32 26L34 26L34 28L32 28L32 30L34 30L34 32L32 32L32 34L34 34L34 36L32 36L32 38L34 38L34 40L32 40L32 42L34 42L34 44L32 44L32 48L46 48L46 14 Z M 10 15L12 15L12 19L10 19 Z M 14 15L16 15L16 19L14 19 Z M 18 15L20 15L20 19L18 19 Z M 22 15L24 15L24 19L22 19 Z M 36 18L38 18L38 20L36 20 Z M 40 18L42 18L42 20L40 20 Z M 10 21L12 21L12 25L10 25 Z M 14 21L16 21L16 25L14 25 Z M 18 21L20 21L20 25L18 25 Z M 22 21L24 21L24 25L22 25 Z M 36 22L38 22L38 24L36 24 Z M 40 22L42 22L42 24L40 24 Z M 36 26L38 26L38 28L36 28 Z M 40 26L42 26L42 28L40 28 Z M 10 27L12 27L12 31L10 31 Z M 14 27L16 27L16 31L14 31 Z M 18 27L20 27L20 31L18 31 Z M 22 27L24 27L24 31L22 31 Z M 36 30L38 30L38 32L36 32 Z M 40 30L42 30L42 32L40 32 Z M 10 33L12 33L12 37L10 37 Z M 14 33L16 33L16 37L14 37 Z M 18 33L20 33L20 37L18 37 Z M 22 33L24 33L24 37L22 37 Z M 36 34L38 34L38 36L36 36 Z M 40 34L42 34L42 36L40 36 Z M 36 38L38 38L38 40L36 40 Z M 40 38L42 38L42 40L40 40 Z M 10 39L12 39L12 44L10 44 Z M 22 39L24 39L24 44L22 44 Z M 36 42L38 42L38 44L36 44 Z M 40 42L42 42L42 44L40 44Z" />
            </svg>
          </div>
          <div className="hall-header-left-title">Ascendant</div>
        </div>
        <div className="hall-header-right">
          <Search />
        </div>
      </div>
      <div className="single-hall-booking">
        <div className="single-hall-booking-header">
          <div className="single-hall-booking-title-btn">
            <div className="single-hall-booking-title">{hall.name}</div>
            <button className="booking-btn" onClick={handleBookingCheck}>
              Booking check
            </button>
          </div>
          <div className="single-hall-booking-rating">
            <div className="rating">
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="star"
              >
                <path
                  d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                  stroke="#604EB4"
                  stroke-width="1.5"
                />
              </svg>
              <div className="rating-title">{hall.rating}</div>
            </div>
            <div className="single-hall-booking-subtitle">
              {hall.companyName}
            </div>
          </div>
        </div>
        <div className="single-hall-booking-main">
          <div className="single-hall-booking-left">
            <div className="hall-booking-left-img">
              <div className="booking-left-img-main">
                <img className="main-img" src={hall.imageUrls} alt="" />
              </div>
              <div className="booking-left-img-block">
                {hall.interiorPhotos.map((item) => (
                  <div className="booking-left-img-second">
                    <img className="right-img" src={item} alt="" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="single-hall-booking-right">
            <div className="hall-booking-equipment">
              <div className="equipment-title">Оборудование</div>
              <div className="test1">
                {hall.equipment.map((item) => (
                  <div className="equipment-desc">{item}</div>
                ))}
              </div>
            </div>
            <div className="hall-booking-location">
              <div className="location-title">Местоположение</div>
              <div className="location-desc">{hall.location}</div>
            </div>
            <div className="hall-booking-floor-capacity">
              <div className="hall-booking-floor">
                <div className="floor-title">Этаж</div>
                <div className="floor-desc">{hall.floor}</div>
              </div>
              <div className="hall-booking-capacity">
                <div className="capacity-title">Вместимость</div>
                <div className="capacity-desc">{hall.maxCapacity}</div>
              </div>
            </div>
            <div className="hall-booking-contact">
              <div className="contact-title">Контактная информация</div>
              <div className="contact-desc">{hall.contactInfo}</div>
            </div>
            <div className="hall-booking-forbidden">
              <svg
                width="30px"
                height="30px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="forbidden-title"
              >
                <path
                  d="M21.12 6.98L17.02 2.88C16.54 2.4 15.58 2 14.9 2H9.1C8.42 2 7.46 2.4 6.98 2.88L2.88 6.98C2.4 7.46 2 8.42 2 9.1V14.9C2 15.58 2.4 16.54 2.88 17.02L6.98 21.12C7.46 21.6 8.42 22 9.1 22H14.9C15.58 22 16.54 21.6 17.02 21.12L21.12 17.02C21.6 16.54 22 15.58 22 14.9V9.1C22 8.42 21.6 7.46 21.12 6.98ZM16.03 14.97C16.32 15.26 16.32 15.74 16.03 16.03C15.88 16.18 15.69 16.25 15.5 16.25C15.31 16.25 15.12 16.18 14.97 16.03L12 13.06L9.03 16.03C8.88 16.18 8.69 16.25 8.5 16.25C8.31 16.25 8.12 16.18 7.97 16.03C7.68 15.74 7.68 15.26 7.97 14.97L10.94 12L7.97 9.03C7.68 8.74 7.68 8.26 7.97 7.97C8.26 7.68 8.74 7.68 9.03 7.97L12 10.94L14.97 7.97C15.26 7.68 15.74 7.68 16.03 7.97C16.32 8.26 16.32 8.74 16.03 9.03L13.06 12L16.03 14.97Z"
                  fill="#604EB4"
                />
              </svg>

              <div className="forbidden-desc">{hall.usageRules}</div>
            </div>
            <div className="hall-booking-cancellation">
              <svg
                fill="#604EB4"
                width="30px"
                height="30px"
                viewBox="0 0 16 16"
                id="calendar-cancel-16px"
                xmlns="http://www.w3.org/2000/svg"
                className="cancellation-icon"
              >
                <path
                  id="Path_157"
                  data-name="Path 157"
                  d="M35.5,1H35V.5a.5.5,0,0,0-1,0V1H26V.5a.5.5,0,0,0-1,0V1h-.5A2.5,2.5,0,0,0,22,3.5v10A2.5,2.5,0,0,0,24.5,16h11A2.5,2.5,0,0,0,38,13.5V3.5A2.5,2.5,0,0,0,35.5,1Zm0,1a1.5,1.5,0,0,1,1.408,1H35V2ZM34,2V3H26V2ZM24.5,2H25V3H23.092A1.5,1.5,0,0,1,24.5,2Zm11,13h-11A1.5,1.5,0,0,1,23,13.5V4H37v9.5A1.5,1.5,0,0,1,35.5,15ZM32.828,7.378,30.707,9.5l2.121,2.122a.5.5,0,0,1-.707.707L30,10.207l-2.121,2.122a.5.5,0,0,1-.707-.707L29.293,9.5,27.172,7.378a.5.5,0,1,1,.707-.707L30,8.793l2.121-2.122a.5.5,0,1,1,.707.707Z"
                  transform="translate(-22)"
                />
              </svg>
              <div className="cancellation-title">
                {hall.cancellationPolicy}
              </div>
            </div>
            <div className="hall-booking-description">{hall.description}</div>
          </div>
        </div>
      </div>
      <div className={`hall-booking-details ${isExpanded ? "expanded" : ""}`}>
        <div className="booking-details-header">
          <div className="booking-details-header-title">Form</div>
          <button
            className="booking-details-btn"
            onClick={handleBookingDetailsClick}
          >
            <svg
              width="30px"
              height="30px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 6V18M12 18L7 13M12 18L17 13"
                stroke="#dbe6ff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} halls={data.hallsResponse.data} />
    </div>
  );
};

export default HallById;

import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContextProvider";
import { useLoaderData } from "react-router-dom";
import Time from "react-time-format";
import apiRequest from "../../lib/apiRequest";
import EditHall from "../edit/editHall";

const Admin = () => {
  const { currentUser } = useContext(AuthContext);
  const data = useLoaderData();
  const [booking, setBooking] = useState(data.bookingResponse.data.data);
  const [selectedHall, setSelectedHall] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const bookingsPerPage = 2;

  console.log(booking);
  console.log(selectedHall);
  const formatDate = () => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const today = new Date();
    return today.toLocaleDateString("ru-RU", options);
  };

  const handleBookingClick = (hall) => {
    setSelectedHall(hall);
    setIsModalOpen(true);
  };
  const handleChangeInfoClick = () => {
    setIsExpanded((prev) => !prev);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHall(null);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Переход на предыдущую страницу
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  // Переход на конкретную страницу
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = selectedHall?.bookings?.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const totalPages = Math.ceil(
    selectedHall?.bookings?.length / bookingsPerPage
  );

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveChanges = async (updatedHall) => {
    try {
      await apiRequest.put(`/hall/update/${updatedHall.id}`, updatedHall);
      setSelectedHall(updatedHall);
      setIsEditMode(false);
      setNotification({ type: "success", message: "Данные успешно обновлены" });
    } catch (error) {
      console.error(error);
      setNotification({
        type: "error",
        message: "Ошибка при обновлении данных",
      });
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
  };

  const handleDeleteBooking = async (id) => {
    try {
      await apiRequest.delete(`/booking/delete/${id}`);

      // Обновляем состояние selectedHall, удаляя удаленную бронь
      setSelectedHall((prev) => ({
        ...prev,
        bookings: prev.bookings.filter((booking) => booking.id !== id),
      }));

      // Обновляем состояние booking, если это необходимо
      setBooking((prevBooking) =>
        prevBooking.map((hall) => {
          if (hall.id === selectedHall.id) {
            return {
              ...hall,
              bookings: hall.bookings.filter((booking) => booking.id !== id),
            };
          }
          return hall;
        })
      );

      setNotification({
        type: "success",
        message: "Бронирование успешно удалено",
      });
    } catch (error) {
      console.error(error);
      setNotification({
        type: "error",
        message: "Ошибка при удалении бронирования",
      });
    }

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <div className="admin">
      <div className="admin-header">
        <div className="admin-header-left">
          <div className="admin-header-left-icon">
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
          <div className="admin-header-left-title">Ascendant Admin Panel</div>
        </div>
        <div className="admin-header-right">
          <div className="admin-header-right-calendar">
            <div className="calendar-icon">
              <svg
                fill="#fff"
                width="20px"
                height="20px"
                viewBox="0 0 16 16"
                id="calendar-cancel-16px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="Path_157"
                  data-name="Path 157"
                  d="M35.5,1H35V.5a.5.5,0,0,0-1,0V1H26V.5a.5.5,0,0,0-1,0V1h-.5A2.5,2.5,0,0,0,22,3.5v10A2.5,2.5,0,0,0,24.5,16h11A2.5,2.5,0,0,0,38,13.5V3.5A2.5,2.5,0,0,0,35.5,1Zm0,1a1.5,1.5,0,0,1,1.408,1H35V2ZM34,2V3H26V2ZM24.5,2H25V3H23.092A1.5,1.5,0,0,1,24.5,2Zm11,13h-11A1.5,1.5,0,0,1,23,13.5V4H37v9.5A1.5,1.5,0,0,1,35.5,15ZM32.828,7.378,30.707,9.5l2.121,2.122a.5.5,0,0,1-.707.707L30,10.207l-2.121,2.122a.5.5,0,0,1-.707-.707L29.293,9.5,27.172,7.378a.5.5,0,1,1,.707-.707L30,8.793l2.121-2.122a.5.5,0,1,1,.707.707Z"
                  transform="translate(-22)"
                />
              </svg>
            </div>
            <span className="admin-header-right-date">{formatDate()}</span>
          </div>
          <div className="admin-header-right-user">{currentUser.fullName}</div>
        </div>
      </div>
      <div className="admin-main">
        <div className="admin-main-header"></div>
        <div className="admin-main-block">
          {booking.map((item) => (
            <div className="admin-main-item">
              <div className="admin-main-item-top">
                <div className="admin-main-item-left">
                  <img
                    className="main-item-left-img"
                    src={item.interiorPhotos[0]}
                    alt=""
                  />
                </div>
                <div className="admin-main-item-right">
                  <div className="main-item-right-title">{item.name}</div>
                  <div className="line"> </div>
                  <div className="main-item-right-desc">{item.description}</div>
                  <div className="main-item-right-bottom">
                    <div className="stairs">
                      <div>
                        <svg
                          width="15px"
                          height="15px"
                          viewBox="0 0 20 20"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          className="stairs-icon"
                        >
                          <title>stairs [#56]</title>
                          <desc>Created with Sketch.</desc>
                          <defs></defs>
                          <g
                            id="Page-1"
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                          >
                            <g
                              id="Dribbble-Light-Preview"
                              transform="translate(-140.000000, -7959.000000)"
                              fill="#fff"
                            >
                              <g
                                id="icons"
                                transform="translate(56.000000, 160.000000)"
                              >
                                <path
                                  d="M102,7817 L86,7817 L86,7801 L90,7801 L90,7807 L96,7807 L96,7813 L102,7813 L102,7817 Z M98,7811 L98,7805 L92,7805 L92,7799 L84,7799 L84,7819 L104,7819 L104,7811 L98,7811 Z"
                                  id="stairs-[#56]"
                                ></path>
                              </g>
                              o
                            </g>
                          </g>
                        </svg>
                      </div>
                      <div>{item.floor}</div>
                    </div>
                    <div className="capacity">
                      <svg
                        fill="#fff"
                        width="20px"
                        height="20px"
                        viewBox="0 0 32 32"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M23.313 26.102l-6.296-3.488c2.34-1.841 2.976-5.459 2.976-7.488v-4.223c0-2.796-3.715-5.91-7.447-5.91-3.73 0-7.544 3.114-7.544 5.91v4.223c0 1.845 0.78 5.576 3.144 7.472l-6.458 3.503s-1.688 0.752-1.688 1.689v2.534c0 0.933 0.757 1.689 1.688 1.689h21.625c0.931 0 1.688-0.757 1.688-1.689v-2.534c0-0.994-1.689-1.689-1.689-1.689zM23.001 30.015h-21.001v-1.788c0.143-0.105 0.344-0.226 0.502-0.298 0.047-0.021 0.094-0.044 0.139-0.070l6.459-3.503c0.589-0.32 0.979-0.912 1.039-1.579s-0.219-1.32-0.741-1.739c-1.677-1.345-2.396-4.322-2.396-5.911v-4.223c0-1.437 2.708-3.91 5.544-3.91 2.889 0 5.447 2.44 5.447 3.91v4.223c0 1.566-0.486 4.557-2.212 5.915-0.528 0.416-0.813 1.070-0.757 1.739s0.446 1.267 1.035 1.589l6.296 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.809zM30.312 21.123l-6.39-3.488c2.34-1.841 3.070-5.459 3.070-7.488v-4.223c0-2.796-3.808-5.941-7.54-5.941-2.425 0-4.904 1.319-6.347 3.007 0.823 0.051 1.73 0.052 2.514 0.302 1.054-0.821 2.386-1.308 3.833-1.308 2.889 0 5.54 2.47 5.54 3.941v4.223c0 1.566-0.58 4.557-2.305 5.915-0.529 0.416-0.813 1.070-0.757 1.739 0.056 0.67 0.445 1.267 1.035 1.589l6.39 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.779h-4.037c0.61 0.46 0.794 1.118 1.031 2h3.319c0.931 0 1.688-0.757 1.688-1.689v-2.503c-0.001-0.995-1.689-1.691-1.689-1.691z"></path>
                      </svg>
                      <div>{item.maxCapacity}</div>
                    </div>
                    <div className="price">
                      <svg
                        fill="#fff"
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8,16a1,1,0,0,0-2,0,5.006,5.006,0,0,0,5,5v1a1,1,0,0,0,2,0V21a5,5,0,0,0,0-10V5a3,3,0,0,1,3,3,1,1,0,0,0,2,0,5.006,5.006,0,0,0-5-5V2a1,1,0,0,0-2,0V3a5,5,0,0,0,0,10v6A3,3,0,0,1,8,16Zm5-3a3,3,0,0,1,0,6ZM8,8a3,3,0,0,1,3-3v6A3,3,0,0,1,8,8Z" />
                      </svg>
                      <div>{item.price}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="admin-main-item-bottom">
                <div
                  className="booking"
                  onClick={() => handleBookingClick(item)}
                >
                  Booking
                </div>
                <div className="pen">
                  <svg
                    width="25px"
                    height="25px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40974 4.40973 4.7157 4.21799 5.09202C4 5.51985 4 6.0799 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.0799 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V12.5M15.5 5.5L18.3284 8.32843M10.7627 10.2373L17.411 3.58902C18.192 2.80797 19.4584 2.80797 20.2394 3.58902C21.0205 4.37007 21.0205 5.6364 20.2394 6.41745L13.3774 13.2794C12.6158 14.0411 12.235 14.4219 11.8012 14.7247C11.4162 14.9936 11.0009 15.2162 10.564 15.3882C10.0717 15.582 9.54378 15.6885 8.48793 15.9016L8 16L8.04745 15.6678C8.21536 14.4925 8.29932 13.9048 8.49029 13.3561C8.65975 12.8692 8.89125 12.4063 9.17906 11.9786C9.50341 11.4966 9.92319 11.0768 10.7627 10.2373Z"
                      stroke="#fff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div className="delete">
                  <svg
                    width="25px"
                    height="25px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 12V17"
                      stroke="#fff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14 12V17"
                      stroke="#fff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4 7H20"
                      stroke="#fff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                      stroke="#fff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                      stroke="#fff"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && selectedHall && (
        <div className="modal-admin">
          <div className={`modal-admin-left-header ${isEditMode ? "onEdit" : "offEdit"}`}>
            <div className="closeAdminModal" onClick={() => closeModal()}>
              <svg
                width="20px"
                height="20px"
                viewBox="-0.5 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 21.32L21 3.32001"
                  stroke="#fff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3 3.32001L21 21.32"
                  stroke="#fff"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className={`changeHall ${isEditMode ? "active" : ""}`} onClick={handleEditClick}>
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40974 4.40973 4.7157 4.21799 5.09202C4 5.51985 4 6.0799 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.0799 20 7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V12.5M15.5 5.5L18.3284 8.32843M10.7627 10.2373L17.411 3.58902C18.192 2.80797 19.4584 2.80797 20.2394 3.58902C21.0205 4.37007 21.0205 5.6364 20.2394 6.41745L13.3774 13.2794C12.6158 14.0411 12.235 14.4219 11.8012 14.7247C11.4162 14.9936 11.0009 15.2162 10.564 15.3882C10.0717 15.582 9.54378 15.6885 8.48793 15.9016L8 16L8.04745 15.6678C8.21536 14.4925 8.29932 13.9048 8.49029 13.3561C8.65975 12.8692 8.89125 12.4063 9.17906 11.9786C9.50341 11.4966 9.92319 11.0768 10.7627 10.2373Z"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="deleteHall">
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 12V17"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14 12V17"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4 7H20"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div
              className={`changeInfo ${isExpanded ? "" : "active"}`}
              onClick={handleChangeInfoClick}
            >
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4H12.01M12.01 10L12 20"
                  stroke="#fff"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="modal-admin-container">
            <div
              className={`modal-admin-left ${
                isExpanded ? "collapsed" : "expanded"
              }`}
            >
              <div className="modal-admin-left-main-block">
                {isEditMode ? (
                  <EditHall
                    hall={selectedHall}
                    onSave={handleSaveChanges}
                    onCancel={handleCancelEdit}
                  />
                ) : (
                  <>
                    <div className="modal-admin-left-block-img">
                      <div className="modal-admin-left-block-main-img">
                        <img
                          src={selectedHall.imageUrls}
                          className="modal-main-img"
                          alt=""
                        />
                      </div>
                      <div className="modal-admin-left-block-second-img">
                        {selectedHall.interiorPhotos.map((item) => (
                          <div className="modal-admin-left-block-second-img-map">
                            <img src={item} className="second-img" alt="" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="modal-admin-left-main">
                      <div className="modal-admin-left-main-title">
                        {selectedHall.name}
                      </div>
                      <div className="modal-admin-left-main-desc">
                        {selectedHall.description}
                      </div>
                      <div
                        className={`modal-admin-left-change-block ${
                          isExpanded ? "" : "expanded"
                        }`}
                      >
                        <div className="modal-admin-left-main-equipment">
                          <div className="main-equipment-title">
                            Оборудование
                          </div>
                          <div className="main-equipment-items">
                            {selectedHall.equipment.map((item) => (
                              <div className="equipment-item">{item}</div>
                            ))}
                          </div>
                          <div className="modal-admin-left-main-capacity-price-floor">
                            <div className="modal-stairs">
                              <div>
                                <svg
                                  width="15px"
                                  height="15px"
                                  viewBox="0 0 20 20"
                                  version="1.1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlns:xlink="http://www.w3.org/1999/xlink"
                                  className="stairs-icon"
                                >
                                  <title>stairs [#56]</title>
                                  <desc>Created with Sketch.</desc>
                                  <defs></defs>
                                  <g
                                    id="Page-1"
                                    stroke="none"
                                    stroke-width="1"
                                    fill="none"
                                    fill-rule="evenodd"
                                  >
                                    <g
                                      id="Dribbble-Light-Preview"
                                      transform="translate(-140.000000, -7959.000000)"
                                      fill="#fff"
                                    >
                                      <g
                                        id="icons"
                                        transform="translate(56.000000, 160.000000)"
                                      >
                                        <path
                                          d="M102,7817 L86,7817 L86,7801 L90,7801 L90,7807 L96,7807 L96,7813 L102,7813 L102,7817 Z M98,7811 L98,7805 L92,7805 L92,7799 L84,7799 L84,7819 L104,7819 L104,7811 L98,7811 Z"
                                          id="stairs-[#56]"
                                        ></path>
                                      </g>
                                      o
                                    </g>
                                  </g>
                                </svg>
                              </div>
                              <div>{selectedHall.floor}</div>
                            </div>
                            <div className="modal-capacity">
                              <svg
                                fill="#fff"
                                width="20px"
                                height="20px"
                                viewBox="0 0 32 32"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M23.313 26.102l-6.296-3.488c2.34-1.841 2.976-5.459 2.976-7.488v-4.223c0-2.796-3.715-5.91-7.447-5.91-3.73 0-7.544 3.114-7.544 5.91v4.223c0 1.845 0.78 5.576 3.144 7.472l-6.458 3.503s-1.688 0.752-1.688 1.689v2.534c0 0.933 0.757 1.689 1.688 1.689h21.625c0.931 0 1.688-0.757 1.688-1.689v-2.534c0-0.994-1.689-1.689-1.689-1.689zM23.001 30.015h-21.001v-1.788c0.143-0.105 0.344-0.226 0.502-0.298 0.047-0.021 0.094-0.044 0.139-0.070l6.459-3.503c0.589-0.32 0.979-0.912 1.039-1.579s-0.219-1.32-0.741-1.739c-1.677-1.345-2.396-4.322-2.396-5.911v-4.223c0-1.437 2.708-3.91 5.544-3.91 2.889 0 5.447 2.44 5.447 3.91v4.223c0 1.566-0.486 4.557-2.212 5.915-0.528 0.416-0.813 1.070-0.757 1.739s0.446 1.267 1.035 1.589l6.296 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.809zM30.312 21.123l-6.39-3.488c2.34-1.841 3.070-5.459 3.070-7.488v-4.223c0-2.796-3.808-5.941-7.54-5.941-2.425 0-4.904 1.319-6.347 3.007 0.823 0.051 1.73 0.052 2.514 0.302 1.054-0.821 2.386-1.308 3.833-1.308 2.889 0 5.54 2.47 5.54 3.941v4.223c0 1.566-0.58 4.557-2.305 5.915-0.529 0.416-0.813 1.070-0.757 1.739 0.056 0.67 0.445 1.267 1.035 1.589l6.39 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.779h-4.037c0.61 0.46 0.794 1.118 1.031 2h3.319c0.931 0 1.688-0.757 1.688-1.689v-2.503c-0.001-0.995-1.689-1.691-1.689-1.691z"></path>
                              </svg>
                              <div>{selectedHall.maxCapacity}</div>
                            </div>
                            <div className="modal-price">
                              <svg
                                fill="#fff"
                                width="20px"
                                height="20px"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M8,16a1,1,0,0,0-2,0,5.006,5.006,0,0,0,5,5v1a1,1,0,0,0,2,0V21a5,5,0,0,0,0-10V5a3,3,0,0,1,3,3,1,1,0,0,0,2,0,5.006,5.006,0,0,0-5-5V2a1,1,0,0,0-2,0V3a5,5,0,0,0,0,10v6A3,3,0,0,1,8,16Zm5-3a3,3,0,0,1,0,6ZM8,8a3,3,0,0,1,3-3v6A3,3,0,0,1,8,8Z" />
                              </svg>
                              <div>{selectedHall.price}</div>
                            </div>
                          </div>
                        </div>

                        <div className="modal-admin-left-main-contact">
                          <div className="main-contact-title">
                            Контактная ифнормация
                          </div>
                          <div className="main-contact-item">
                            {selectedHall.contactInfo}
                          </div>
                        </div>
                        <div className="modal-admin-left-main-type">
                          <div className="main-type-title">Тип помещения</div>
                          <div className="main-type-item">
                            {selectedHall.hallType}
                          </div>
                        </div>
                        <div className="modal-admin-left-main-location">
                          <div className="main-location-title">
                            Расположение
                          </div>
                          <div className="main-location-item">
                            {selectedHall.location}
                          </div>
                        </div>
                        <div className="modal-admin-left-main-event-type">
                          <div className="main-event-type-title">
                            Мероприятия
                          </div>
                          <div className="main-event-type-items">
                            {selectedHall.eventType.map((item) => (
                              <div className="event-type-item">{item}</div>
                            ))}
                          </div>
                        </div>
                        <div className="modal-admin-left-main-company-name">
                          <div className="main-company-name-title">
                            Имя компании
                          </div>
                          <div className="main-company-name-item">
                            {selectedHall.companyName}
                          </div>
                        </div>
                        <div className="modal-admin-left-main-time">
                          <div className="main-time-title">Время Создания</div>
                          <div className="main-time-items">
                            <div className="main-time-item-createdAt">
                              <div className="main-time-item-createdAt-y-m-d">
                                <Time
                                  value={selectedHall.createdAt}
                                  format="YYYY.MM.DD"
                                />
                              </div>
                              <div className="main-time-item-createdAt-h-m">
                                <Time
                                  value={selectedHall.createdAt}
                                  format="hh:mm"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="modal-admin-left-main-time">
                          <div className="main-time-title">
                            Время Обновления
                          </div>
                          <div className="main-time-items">
                            <div className="main-time-item-updateAt">
                              <div className="main-time-item-updateAt-y-m-d">
                                <Time
                                  value={selectedHall.updatedAt}
                                  format="YYYY.MM.DD"
                                />
                              </div>
                              <div className="main-time-item-updateAt-h-m">
                                <Time
                                  value={selectedHall.updatedAt}
                                  format="hh:mm"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`test52 ${isExpanded ? "" : "expanded"}`}
                        >
                          <div className="modal-admin-left-main-company-id">
                            <div className="main-company-id-title">
                              ID компании
                            </div>
                            <div className="main-company-id-item">
                              {selectedHall.companyId}
                            </div>
                          </div>
                          <div className="modal-admin-left-main-duration">
                            <div className="main-duration-title">
                              Мин. время бронирования
                            </div>
                            <div className="main-duration-item">
                              {selectedHall.minBookingDuration}
                            </div>
                          </div>
                          <div className="modal-admin-left-main-duration">
                            <div className="main-duration-title">
                              Мин. время бронирования
                            </div>
                            <div className="main-duration-item">
                              {selectedHall.maxBookingDuration}
                            </div>
                          </div>
                          <div className="modal-admin-left-main-services">
                            <div className="main-services-title">
                              Доп. услуги
                            </div>
                            <div className="main-services-items">
                              {selectedHall.additionalServices.map((item) => (
                                <div className="main-services-item">{item}</div>
                              ))}
                            </div>
                          </div>
                          <div className="modal-admin-left-main-rules">
                            <div className="main-rules-title">Запреты</div>
                            <div className="main-rules-item">
                              {selectedHall.usageRules}
                            </div>
                          </div>
                          <div className="modal-admin-left-main-rating">
                            <div className="main-rating-title">Рейтинг</div>
                            <div className="main-rating-item">
                              {selectedHall.rating}
                            </div>
                          </div>
                          <div className="modal-admin-left-main-review">
                            <div className="main-review-title">
                              Кол-во отзывов
                            </div>
                            <div className="main-review-item">
                              {selectedHall.reviewCount}
                            </div>
                          </div>
                          <div className="modal-admin-left-main-wifi">
                            <div className="main-wifi-title">Наличие Wi-Fi</div>
                            <div className="main-wifi-item">
                              {selectedHall.wifiAvailable ? "Есть" : "Нету"}
                            </div>
                          </div>
                          <div className="modal-admin-left-main-smoking">
                            <div className="main-smoking-title">
                              Зона для курения
                            </div>
                            <div className="main-smoking-item">
                              {selectedHall.smokingArea ? "Есть" : "Нету"}
                            </div>
                          </div>
                          <div className="modal-admin-left-main-preparation">
                            <div className="main-preparation-title">
                              Готовность зала
                            </div>
                            <div className="main-preparation-item">
                              В течении {selectedHall.preparationTime} часов
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div
              className={`modal-admin-right ${isExpanded ? " " : "collapsed"}`}
            >
              <div className="modal-admin-right-flex-block">
                {currentBookings?.map((item) => (
                  <div
                    className={`modal-admin-right-items ${
                      isExpanded ? "" : "collapsed"
                    }`}
                    key={item.id}
                  >
                    <div
                      className={`modal-admin-right-item-fullName ${
                        isExpanded ? "" : "collapsed"
                      }`}
                    >
                      {item.fullName}
                    </div>
                    <div
                      className={`modal-admin-right-item-id ${
                        isExpanded ? "" : "collapsed"
                      }`}
                    >
                      ID: {item.id}
                    </div>
                    <div
                      className={`modal-admin-right-item-mail ${
                        isExpanded ? "" : "collapsed"
                      }`}
                    >
                      Почта: {item.email}
                    </div>
                    <div
                      className={`modal-admin-right-item-phone ${
                        isExpanded ? "" : "collapsed"
                      }`}
                    >
                      Телефон: +7{item.phone}
                    </div>
                    <div>Бронирование</div>
                    <div
                      className={`modal-admin-right-item-bookingTime ${
                        isExpanded ? "" : "collapsed"
                      }`}
                    >
                      <Time value={item.startTime} format="YYYY.MM.DD" />
                      <div className="booking-flex-block">
                        <Time value={item.startTime} format="hh:mm" /> /{" "}
                        <Time value={item.endTime} format="hh:mm" />
                      </div>
                    </div>
                    <div
                      className={`modal-admin-right-item-guest ${
                        isExpanded ? "" : "collapsed"
                      }`}
                    >
                      Гостей: {item.guestCount}
                    </div>
                    <div
                      className={`modal-admin-right-item-created ${
                        isExpanded ? "" : "collapsed"
                      }`}
                    >
                      Время создания:{" "}
                      <Time value={item.createdAt} format="YYYY.MM.DD hh:mm" />
                    </div>
                    <div
                      className={`modal-admin-right-item-created ${
                        isExpanded ? "" : "collapsed"
                      }`}
                    >
                      Время обновления:{" "}
                      <Time value={item.createdAt} format="YYYY.MM.DD hh:mm" />
                    </div>
                    <div className="booking-right-btn">
                      <div className="selected-btn">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="15px"
                          height="15px"
                          viewBox="0 0 1024 1024"
                        >
                          <path
                            fill="#fff"
                            d="M77.248 415.04a64 64 0 0 1 90.496 0l226.304 226.304L846.528 188.8a64 64 0 1 1 90.56 90.496l-543.04 543.04-316.8-316.8a64 64 0 0 1 0-90.496z"
                          />
                        </svg>
                      </div>
                      <div
                        className="del-btn"
                        onClick={() => handleDeleteBooking(item.id)}
                      >
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 12V17"
                            stroke="#fff"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M14 12V17"
                            stroke="#fff"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M4 7H20"
                            stroke="#fff"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
                            stroke="#fff"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                            stroke="#fff"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Пагинация */}
              {totalPages > 1 && (
                <div className="pagination">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageClick(index + 1)}
                      className={currentPage === index + 1 ? "active" : ""}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
              {notification && (
                <div
                  className={`notification notification-${notification.type}`}
                  role="alert"
                >
                  {notification.message}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

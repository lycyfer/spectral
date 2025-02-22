import { useEffect, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [halls, setHalls] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  // Загрузка залов только при монтировании компонента
  useEffect(() => {
    const fetchHalls = async () => {
      try {
        const response = await apiRequest("/hall/get");
        console.log(response);
        setHalls(response.data); // Убедитесь, что response.data содержит массив залов
      } catch (error) {
        console.log(error);
      }
    };
    fetchHalls();
  }, []); // Пустой массив зависимостей, чтобы запрос выполнялся только один раз

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchTerm(value);
    setIsVisible(value.length > 0);
  };

  const filteredHalls = halls.filter((hall) => {
    const matchesName = hall.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCapacity = hall.maxCapacity.toString().includes(searchTerm);
    return matchesName || matchesCapacity;
  });

  return (
    <div className="search">
      <div className="group">
        <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
          </g>
        </svg>
        <input
          placeholder="Search"
          type="search"
          className="input"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      {isVisible && filteredHalls.length > 0 && (
        <div className="response-block visible">
          {filteredHalls.map((hall) => (
            <Link to={`/hall/${hall.id}`} className="response-block-item" key={hall.id}>
              <img src={hall.imageUrls[0]} alt={hall.name} />
              <div className="response-block-item-des">
                <div className="response-block-item-title">{hall.name}</div>
                <div className="response-block-bottom">
                <div className="response-block-item-capacity">
                  <div className="response-capacity-icon">
                    <svg
                      fill="#DBE6FF"
                      width="20px"
                      height="20px"
                      viewBox="0 0 32 32"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M23.313 26.102l-6.296-3.488c2.34-1.841 2.976-5.459 2.976-7.488v-4.223c0-2.796-3.715-5.91-7.447-5.91-3.73 0-7.544 3.114-7.544 5.91v4.223c0 1.845 0.78 5.576 3.144 7.472l-6.458 3.503s-1.688 0.752-1.688 1.689v2.534c0 0.933 0.757 1.689 1.688 1.689h21.625c0.931 0 1.688-0.757 1.688-1.689v-2.534c0-0.994-1.689-1.689-1.689-1.689zM23.001 30.015h-21.001v-1.788c0.143-0.105 0.344-0.226 0.502-0.298 0.047-0.021 0.094-0.044 0.139-0.070l6.459-3.503c0.589-0.32 0.979-0.912 1.039-1.579s-0.219-1.32-0.741-1.739c-1.677-1.345-2.396-4.322-2.396-5.911v-4.223c0-1.437 2.708-3.91 5.544-3.91 2.889 0 5.447 2.44 5.447 3.91v4.223c0 1.566-0.486 4.557-2.212 5.915-0.528 0.416-0.813 1.070-0.757 1.739s0.446 1.267 1.035 1.589l6.296 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.809zM30.312 21.123l-6.39-3.488c2.34-1.841 3.070-5.459 3.070-7.488v-4.223c0-2.796-3.808-5.941-7.54-5.941-2.425 0-4.904 1.319-6.347 3.007 0.823 0.051 1.73 0.052 2.514 0.302 1.054-0.821 2.386-1.308 3.833-1.308 2.889 0 5.54 2.47 5.54 3.941v4.223c0 1.566-0.58 4.557-2.305 5.915-0.529 0.416-0.813 1.070-0.757 1.739 0.056 0.67 0.445 1.267 1.035 1.589l6.39 3.488c0.055 0.030 0.126 0.063 0.184 0.089 0.148 0.063 0.329 0.167 0.462 0.259v1.779h-4.037c0.61 0.46 0.794 1.118 1.031 2h3.319c0.931 0 1.688-0.757 1.688-1.689v-2.503c-0.001-0.995-1.689-1.691-1.689-1.691z"></path>
                    </svg>
                  </div>
                  <div className="response-capacity">{hall.maxCapacity}</div>
                </div>
                <div className="response-block-item-large">Этаж {hall.floor}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {isVisible && filteredHalls.length === 0 && (
        <div className="response-block visible">
          <div className="response-block-item">No halls found</div>
        </div>
      )}
    </div>
  );
};

export default Search;

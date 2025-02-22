import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, AuthContextProvider } from "../../../context/authContextProvider";
import apiRequest from "../../../lib/apiRequest";

const Login = () => {

  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const {updateUser} = useContext(AuthContext)
  console.log(updateUser)
  const navigate = useNavigate()

  const handleError = (message) => {
    setError(message)
    setTimeout(() => {
      setError(null)
    }, 5000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    setError("")
    const formData = new FormData(e.target)

    const email = formData.get("email")
    const password = formData.get("password")

    try {
      const res = await apiRequest.post("/auth/login", {
        email,
        password
      })
      console.log(res)
      updateUser(res.data)
      navigate("/admin")
    } catch (err) {
      if(err.response && err.response.status === 401) {
        setError("Неправильный пароль или логин")
      } else {
        console.log(err)
        setError(err.message)
      }
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <div className="login">
      <div className="login-header">
        <div className="login-header-left">
          <div className="login-header-left-icon">
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
          <div className="login-header-left-title">Ascendant</div>
        </div>
        <Link to="/" className="login-header-right">
          <svg
            fill="#fff"
            height="20px"
            width="20px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 56 56"
            xml:space="preserve"
            className="login-header-right-svg"
          >
            <g>
              <path
                d="M54.424,28.382c0.101-0.244,0.101-0.519,0-0.764c-0.051-0.123-0.125-0.234-0.217-0.327L42.208,15.293
		c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414L51.087,27H20.501c-0.552,0-1,0.447-1,1s0.448,1,1,1h30.586L40.794,39.293
		c-0.391,0.391-0.391,1.023,0,1.414C40.989,40.902,41.245,41,41.501,41s0.512-0.098,0.707-0.293l11.999-11.999
		C54.299,28.616,54.373,28.505,54.424,28.382z"
              />
              <path
                d="M36.501,33c-0.552,0-1,0.447-1,1v20h-32V2h32v20c0,0.553,0.448,1,1,1s1-0.447,1-1V1c0-0.553-0.448-1-1-1h-34
		c-0.552,0-1,0.447-1,1v54c0,0.553,0.448,1,1,1h34c0.552,0,1-0.447,1-1V34C37.501,33.447,37.053,33,36.501,33z"
              />
            </g>
          </svg>
        </Link>
      </div>
      <div className="login-form">
        <div className="login-form-container">
          <div className="login-form-wrapper">
            <span className="login-form-title">Ascendant Login</span>
            <span className="login-form-subtitle">Авторизоваться</span>
            <form onSubmit={handleSubmit} className="login-form-main">
              <div className="input-group">
                <input
                  type="text"
                  name="email"
                  required
                  className="input-group-login"
                />
                <label className="label-form-login">Почта</label>
              </div>
              <div className="input-group">
                <input
                  type="text"
                  name="password"
                  required
                  className="input-group-login"
                />
                <label className="label-form-login">Пароль</label>
              </div>
              <button className="sign-in" disabled={isLoading} onClick={() => handleError("Неправильный пароль или логин")}>Войти</button>
              {error && <span className="span_err">{error}</span>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

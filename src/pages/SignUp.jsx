import React from "react";
import { useTranslation } from "react-i18next";
import { Menu } from "../components/Menu";
import { HandleSignUp } from "../helper/HandleSignUp";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
export const SignUp = () => {
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  return (
    <div className="App">
      <header>
        <Menu />
      </header>
      <main>
        <section className="vh-100">
          <div className="container py-5 h-100">
            <div className="row d-flex align-items-center justify-content-center h-100">
              <div className="col-md-8 col-lg-7 col-xl-6">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                  className="img-fluid"
                  alt="Phone"
                />
              </div>
              <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                <form
                  onSubmit={handleSubmit((data) => {
                    HandleSignUp(data, navigate);
                  })}
                  style={{ width: "23rem" }}
                >
                  <h3
                    className="fw-normal mb-3 pb-3"
                    style={{ letterSpacing: "pacing1px" }}
                  >
                    {t("menu_sign_up")}
                  </h3>

                  <div className="form mb-2">
                    <input
                      {...register("firstName", {
                        required: true,
                        maxLength: 20,
                      })}
                      type="text"
                      placeholder={t("menu_firstName")}
                      id="firstName"
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="form mb-2">
                    <input
                      {...register("lastName", {
                        required: true,
                        maxLength: 20,
                      })}
                      placeholder={t("menu_lastName")}
                      type="text"
                      id="LastName"
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="form mb-2">
                    <input
                      {...register("email", { required: true })}
                      type="email"
                      id="form2Example18"
                      placeholder={t("menu_email")}
                      label="Email"
                      className="form-control form-control-lg"
                    />
                  </div>

                  <div className="form mb-2">
                    <input
                      {...register("password", {
                        required: true,
                        minLength: 5,
                      })}
                      type="password"
                      id="form2Example28"
                      className="form-control form-control-lg"
                      placeholder={t("menu_password")}
                    />
                  </div>

                  <div className="pt-1 mb-2">
                    <button
                      className="btn btn-info btn-lg btn-block"
                      type="submit"
                    >
                      {t("menu_sign_up")}
                    </button>
                  </div>

                  <p>
                    {t("menu_login_text")}
                    <Link to={"/"} className="link-info">
                      {t("menu_login")}
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

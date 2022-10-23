import React from "react";
import { useTranslation } from "react-i18next";
import { Menu } from "../components/Menu";
import { HandleGoogleLogin, HandleLogin } from "../helper/HandleLogin";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
export const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) =>
      HandleGoogleLogin(tokenResponse.access_token, navigate),
  });

  return (
    <div className="App">
      <header>
        <Menu />
      </header>
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
                  HandleLogin(data, navigate);
                })}
                style={{ width: "23rem" }}
              >
                <h3
                  className="fw-normal mb-3 pb-3"
                  style={{ letterSpacing: "pacing1px" }}
                >
                  {t("menu_login")}
                </h3>

                <div className="form mb-4">
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    placeholder={t("menu_email")}
                    id="form2Example18"
                    className="form-control form-control-lg"
                  />
                </div>

                <div className="form mb-4">
                  <input
                    {...register("password", { required: true })}
                    type="password"
                    placeholder={t("menu_password")}
                    id="form2Example28"
                    className="form-control form-control-lg"
                  />
                </div>

                <div className="pt-1 mb-4">
                  <button
                    className="btn btn-info btn-lg btn-block"
                    type="submit"
                  >
                    {t("menu_login")}
                  </button>
                </div>

                <div class="divider d-flex align-items-center my-4">
                  <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>

                {/* social login */}
                <div>
                  <a
                    class="btn btn-primary btn-lg btn-block"
                    style={{ backgroundColor: "#3b5998" }}
                    role="button"
                    onClick={() => login()}
                  >
                    <i class="fab fa-google me-2"></i>
                    Continue with google
                  </a>
                  <a
                    class="btn btn-primary btn-lg btn-block"
                    style={{ backgroundColor: "#55acee" }}
                    role="button"
                  >
                    <i class="fab fa-facebook me-2"></i>Continue with facebook
                  </a>
                </div>

                {/* sign up */}
                <p>
                  {t("menu_register_text")}
                  <a href="/signup" className="link-info">
                    {t("menu_register")}
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

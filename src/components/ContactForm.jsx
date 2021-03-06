import React from "react";

import { useFormik } from "formik";
import contactValidation from "../schema/contactValidation";

import ReCAPTCHA from "react-google-recaptcha";



const ContactForm = ({ contactData }) => {
  const recaptchaRef = React.useRef(null);
  const [submitted, setSubmitted] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },

    validationSchema: contactValidation,

    onSubmit: async (values, { resetForm }) => {
      const token = await recaptchaRef.current.executeAsync().then((res) => {
        if (res) {
          // console.log("Sending");

          let data = {
            name: values.name,
            email: values.email,
            message: values.message,
            phone: values.phone,
          };
          fetch("/api/contact", {
            method: "POST",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }).then((res) => {
            // console.log("Response received");
            if (res.status === 200) {
              // console.log("Response succeeded!");
              setSubmitted(true);
              resetForm();
            }
          });
        }
      });
    },
  });
  const onReCAPTCHAChange = async (captchaCode) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if (!captchaCode) {
      return;
    }
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          email: formik.values.email,
          captcha: captchaCode,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        // If the response is ok than show the success alert
        //TODO add i18n
        alert("Email byl odeslán");
      } else {
        // Else throw an error with the message returned
        // from the API
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      alert(error?.message || "Something went wrong");
    } finally {
      // Reset the reCAPTCHA when the request has failed or succeeeded
      // so that it can be executed again if user submits another email.
      recaptchaRef.current.reset();
    }
  };

  return (
    <form
      className="flex flex-col space-y-6 py-6 md:py-0 md:px-6"
      onSubmit={formik.handleSubmit}
    >
      {contactData.FormField.map((field) =>
        field.Name == "message" ? (
          <label className="block" key={field.id}>
            <span className="mb-1">{field.Label}</span>
            <textarea
              id={field.Name}
              name={field.Name}
              placeholder={field.PlaceHolder}
              value={formik.values[field.Name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              rows="5"
              className="block w-full shadow-sm focus:border-b-2 focus-visible:outline-0 dark:bg-gray-800"
            />
            {formik.touched[field.Name] && formik.errors[field.Name] ? (
              <div className=" text-red-600 text-xs">
                {formik.errors[field.Name]}
              </div>
            ) : null}
          </label>
        ) : (
          <label className="block" key={field.id}>
            <span className="mb-1">{field.Label}</span>
            <input
              type="text"
              id={field.Name}
              name={field.Name}
              placeholder={field.PlaceHolder}
              value={formik.values[field.Name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="block w-full shadow-sm focus:border-b-2 focus-visible:outline-0 dark:bg-gray-800"
            />
            {formik.touched[field.Name] && formik.errors[field.Name] ? (
              <div className=" text-red-600 text-xs">
                {formik.errors[field.Name]}
              </div>
            ) : null}
          </label>
        )
      )}

      <button
        type="submit"
        className="self-center rounded px-8 py-3 text-lg hover:ring hover:ring-orange-400 focus:ring focus:ring-orange-400 focus:ring-opacity-75 dark:bg-orange-400 dark:text-gray-900"
      >
        {contactData.SubmitButton}
      </button>
      <ReCAPTCHA
        size="invisible"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY}
        onChange={onReCAPTCHAChange}
        ref={recaptchaRef}
      />
    </form>
  );
};

export default ContactForm;

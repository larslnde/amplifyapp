import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import "./styles.css";
import "./styles-custom.css";
import { configure } from "@testing-library/react";
//import Amplify, { API } from 'aws-amplify';
//import DatePicker from "react-datepicker";


/*Amplify.configure({
    API: {
        endpoints: [
            {
                name: "GETAPI",
                endpoint: "https://8svw2fhs59.execute-api.eu-west-2.amazonaws.com/dev/applicants",
                service: "lambda",
                region: "eu-west-2"

            },
            {
                name: "POSTAPI",
                endpoint: "https://8svw2fhs59.execute-api.eu-west-2.amazonaws.com/dev/applicants",
                service: "lambda",
                region: "eu-west-2"
            }
        ]
    }
})*/

const axios = require('axios');
const axiospost = "https://8svw2fhs59.execute-api.eu-west-2.amazonaws.com/dev/applicants";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyCheckbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <>
      <label className="checkbox">
        <input {...field} {...props} type="checkbox" />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyRadio = ({ children, ...props }) => {
    const [field, meta] = useField({ ...props, type: "radio" });
    return (
      <>
        <label className="radio">
          <input {...field} {...props} type="radio" />
          {children}
        </label>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

const MySelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
          <select {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };



const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const websiteRegExp = /^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

const SignupForm = () => {
  return (
    <>
      <h1>Application for the Openner.vc accelerator program</h1>
      <Formik
        initialValues={{
          company_name: "",
          company_website: "",
          first_name: "",
          surname: "",
          email: "",
          phone_number: "",
          incorp_country: "",
          incorp_date: "",

          
          timezone: false,
          privacy_policy: false, 
          newsletter: false,
          phaseType: ""
        }}
        validationSchema={Yup.object({
          company_name: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          company_website: Yup.string()
            .matches(websiteRegExp, 'Please enter a valid url')
            .required("Required"),
          first_name: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          surname: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email addresss")
            .required("Required"),
          phone_number: Yup.string()
            .matches(phoneRegExp, "Please enter a valid phone number")
            .required("Required."),
          incorp_country: Yup.string()
            .oneOf(
              ["c1", "c2"],
              "Invalid country"
            )
            .required("Required"),
          

          privacy_policy: Yup.boolean()
            .oneOf([true], "You must accept the privacy policy.")
            .required("Required"),
          timezone: Yup.boolean()
            .oneOf([true], "Please complete this required field.")
            .required("Required"),
          newsletter: Yup.boolean()
            .oneOf([true], "Please complete this required field.")
            .required("Required"),
          phaseType: Yup.string()
            // specify the set of valid values for job type
            // @see http://bit.ly/yup-mixed-oneOf
            .oneOf(
              ["Phase 1", "Phase 2", "p1p2"],
              "Invalid Job Type"
            )
            .required("Required")
        })}
        
        onSubmit={async (values, { setSubmitting }) => {
          alert(JSON.stringify(values, null, 2));
          axios.post(axiospost, JSON.stringify(values, null, 2))
          await new Promise(r => setTimeout(r, 500));
          setSubmitting(false);
        }}
      >
        <Form>
          <MyTextInput
            label="Company Name:*"
            name="company_name"
            type="text"
            placeholder="Openner"
          />
          <MyTextInput
            label="Company Website:*"
            name="company_website"
            type="text"
            placeholder="Openner.vc"
          />
          <MyTextInput
            label="Primary contact's first name:*"
            name="first_name"
            type="text"
            placeholder="Jane"
          />
          <MyTextInput
            label="Primary contact's last name:*"
            name="surname"
            type="text"
            placeholder="Doe"
          />
          <MyTextInput
            label="Primary contact's email address:*"
            name="email"
            type="email"
            placeholder="jane@email.com"
          />
          <MyTextInput
            label="Primary contact's phone number:* CHANGE TO FIT FORMATTING"
            name="phone_number"
            type="text"
            placeholder="+X XXX-XXX-XXXX"
          />
          <MySelect label="Country company was legally incorporated?* CHANGE TO FULL DROPDOWN" name="incorp_country">
            <option value="">Please Select</option>
            <option value="c1">Country1</option>
            <option value="c2">Country2</option>
          </MySelect>
          <MyTextInput
            label="Date of incorporation:* CHANGE TO HAVE CALENDER"
            name="incorp_date"
            type="text"
            placeholder="YYYY/MM/DD"
          />



          <MySelect label="What phase of the program are you applying for?*" name="phaseType">
            <option value="">Please Select</option>
            <option value="Phase 1">Phase 1</option>
            <option value="Phase 2">Phase 2</option>
            <option value="p1p2">Both Phase 1 and 2</option>
          </MySelect>
          <MyCheckbox name="privacy_policy">
            I have read and understand the privacy policy.*
          </MyCheckbox>
          <MyCheckbox name="timezone">
            I understand that Openner.vc is located in Washington D.C and all programs will run on Eastern Time (ET).*
          </MyCheckbox>
          <MyCheckbox name="newsletter">
            I agree to recieve updates, newsletters, promotions, and related messages.*
          </MyCheckbox>
          <button type="submit" onClick="submitForm">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

function App() {
  return <SignupForm />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
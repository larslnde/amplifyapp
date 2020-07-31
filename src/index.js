import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import styled from "@emotion/styled";
import "./styles.css";
import "./styles-custom.css";

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and alse replace ErrorMessage entirely.
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


const SignupForm = () => {
  return (
    <>
      <h1>Application for the Openner.vc accelerator program</h1>
      <Formik
        initialValues={{
          companyName: "",
          companyWebsite: "",
          firstName: "",
          lastName: "",
          email: "",
          acceptedTimezone: false,
          acceptedTerms: false, 
          acceptedNewsletter: false,
          phaseType: ""
        }}
        validationSchema={Yup.object({
          companyName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          companyWebsite: Yup.string()
            .matches(
                /^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/, 'Please enter a valid url.')
            .required("Required"),
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email addresss`")
            .required("Required"),
          acceptedTerms: Yup.boolean()
            .required("Required")
            .oneOf([true], "You must accept the privacy policy."),
          acceptedTimezone: Yup.boolean()
            .required("Required")
            .oneOf([true], "Please complete this required field."),
          acceptedNewsletter: Yup.boolean()
            .required("Required")
            .oneOf([true], "Please complete this required field."),
          phaseType: Yup.string()
            // specify the set of valid values for job type
            // @see http://bit.ly/yup-mixed-oneOf
            .oneOf(
              ["Phase 1", "Phase 2", "Both Phase 1 and 2"],
              "Invalid Job Type"
            )
            .required("Required")
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await new Promise(r => setTimeout(r, 500));
          setSubmitting(false);
        }}
      >
        <Form>
          <MyTextInput
            label="Company Name"
            name="companyName"
            type="text"
            placeholder="Openner"
          />
          <MyTextInput
            label="Company Website"
            name="companyWebsite"
            type="text"
            placeholder="Openner.vc"
          />
          <MyTextInput
            label="First Name"
            name="firstName"
            type="text"
            placeholder="Jane"
          />
          <MyTextInput
            label="Last Name"
            name="lastName"
            type="text"
            placeholder="Doe"
          />
          <MyTextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@email.com"
          />
          <MySelect label="What phase of the program are you applying for?" name="phaseType">
            <option value="">Please Select</option>
            <option value="Phase 1">Phase 1</option>
            <option value="Phase 2">Phase 2</option>
            <option value="Both Phase 1 and 2">Both Phase 1 and 2</option>
          </MySelect>
          <MyCheckbox name="acceptedTerms">
            I have read and understand the privacy policy.
          </MyCheckbox>
          <MyCheckbox name="acceptedTimezone">
            I understand that Openner.vc is located in Washington D.C and all programs will run on Eastern Time (ET).
          </MyCheckbox>
          <MyCheckbox name="acceptedNewsletter">
            I agree to recieve updates, newsletters, promotions, and related messages.
          </MyCheckbox>

          <button type="submit">Submit</button>
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

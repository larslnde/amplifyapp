import React, { useEffect } from "react";
import { Formik, Form, Field, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import "./styles.css";
import "./styles-custom.css";
import MaskedInput from 'react-text-mask'
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

const MyTextArea = ({label, ...props}) => {
  const [field, meta] = useField(props);
  return (
      <>
          <label htmlFor={props.id || props.name}>{label}</label>
          <textarea className="text-area" {...field} {...props} />
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


const phoneNumberMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

const MyPhoneNumber = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <MaskedInput mask = {phoneNumberMask} className="text" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

const websiteRegExp = /^((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

const numberRegExp = /^[0-9]{1,30}?$/;

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
          operations_in_other_countries: "",
          optional_other_countries: "",
          sector: "",
          business_model: "",
          describe_company: "",
          pitch_deck: "",
          company_stage: "",
          monthly_users: "",
          revenue_1mo: "",
          revenue_2mo: "",
          revenue_3mo: "",
          raised_capital: false,
          optional_raised_capital: "",
          founding_team_size: "",
          majority_ownership: false,
          months_runway: "",
          targeted_countries: "",
          growth_strategy: "",
          industry_target_customer: "",
          customer_focus: "",
          achievement_hope: "",
          hear_about: "",
          anything_else: "",
          phaseType: "",
          timezone: false,
          privacy_policy: false, 
          newsletter: false,
          
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
            .required("Required"),
          incorp_country: Yup.string()
            .oneOf(
              ["c1", "c2"],
              "Invalid country")
            .required("Required"),
          operations_in_other_countries: Yup.string()
            .oneOf(
            ["yes", "no"],
            "Please select an answer")
            .required("Required"),
          optional_other_countries: Yup.string()
            .max(100, "Must be 100 characters or less"),
          sector: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          business_model: Yup.string()
            .oneOf(
            ["b2b", "b2c", "both", "other"], 
            "Please select an answer")
            .required("Required"),
          describe_company: Yup.string()
            .max(280, "Must be 280 characters or less")
            .required("Required"),
          pitch_deck: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          company_stage: Yup.string()
            .oneOf(
            ["prelaunch", "launch", "growth"], 
            "Please select an answer")
            .required("Required"),
          monthly_users: Yup.string()
            .matches(numberRegExp, "Monthly users must be a number")
            .required("Required"),
          revenue_1mo: Yup.string()
            .matches(numberRegExp, "Revenue must be a number")
            .required("Required"),
          revenue_2mo: Yup.string()
            .matches(numberRegExp, "Revenue must be a number")
            .required("Required"),
          revenue_3mo: Yup.string()
            .matches(numberRegExp, "Revenue must be a number")
            .required("Required"),
          raised_capital: Yup.string()
          .oneOf(
            ["yes", "no"], 
            "Please select an answer")
            .required("Required"),
          optional_raised_capital: Yup.string()
            .max(280, "Must be 280 characters or less"),
          founding_team_size: Yup.string()
            .oneOf(
              ["1", "2", "3-5", "5+"], 
              "Please select an answer")
            .required("Required"),
          majority_ownership: Yup.string()
            .oneOf(
              ["yes", "no"], 
              "Please select an answer")
            .required("Required"),
          months_runway: Yup.string()
            .matches(numberRegExp, "Revenue must be a number")
            .required("Required"),
          targeted_countries: Yup.string()
            .max(280, "Must be 280 characters or less")
            .required("Required"),
          growth_strategy: Yup.string()
            .max(280, "Must be 280 characters or less")
            .required("Required"),
          industry_target_customer: Yup.string()
            .max(280, "Must be 280 characters or less")
            .required("Required"),
          customer_focus: Yup.string()
            .max(280, "Must be 280 characters or less")
            .required("Required"),
          hear_about: Yup.string()
            .oneOf(
              ["p1", "p2"],
              "Invalid Job Type")
            .required("Required"),
          anything_else: Yup.string()
          .max(280, "Must be 280 characters or less"),
          phaseType: Yup.string()
          .oneOf(
            ["Phase 1", "Phase 2", "p1p2"],
            "Invalid Job Type")
          .required("Required"),
          achievement_hope: Yup.string()
            .max(280, "Must be 280 characters or less")
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
          <MyPhoneNumber
            label="Primary contact's US phone number:*"
            name="phone_number"
            type="text"
            placeholder="(XXX) XXX-XXXX"
          />
          <MySelect label="Country company was legally incorporated?* CHANGE TO FULL DROPDOWN" name="incorp_country">
            <option value="">Please Select</option>
            <option value="c1">Country1</option>
            <option value="c2">Country2</option>
          </MySelect>
          <MyTextInput
            label="Date of incorporation:*"
            name="incorp_date"
            type="date"
            placeholder="DD/MM/YYYY"
          />
          <MySelect label="Do you have operations in other countries?" name="operations_in_other_countries">
            <option value="">Please Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </MySelect>
          <MyTextInput
            label="If yes, which other countries?"
            name="optional_other_countries"
            type="text"
            placeholder="United Kingdom, China, etc."
          />
          <MyTextInput
            label="What sector/category best describes your business?:*"
            name="sector"
            type="text"
            placeholder="Examples: AdTech, EdTech, Fintech, etc."
          />
          <MySelect label="What is your business model?*" name="business_model">
            <option value="">Please Select</option>
            <option value="b2c">B2C</option>
            <option value="b2b">B2B</option>
            <option value="both">Both</option>
            <option value="other">Other</option>
          </MySelect>
          <MyTextArea
            label="Describe your company tweet-style (280 characters or less):*"
            name="describe_company"
            type="textarea"
            placeholder="Openner is an accelerator for tech startups."
          />
          <MyTextInput
            label="Please attach your pitch deck* THIS IS A PLACEHOLDER"
            name="pitch_deck"
            type="text"
            placeholder="PLACEHOLDER.PDF. Add upload functionality"
          />
          <MySelect label="What stage is your company in?" name="company_stage">
            <option value="">Please Select</option>
            <option value="prelaunch">Pre-launch</option>
            <option value="launch">Launch / Finding Product-Market Fit (PMF)</option>
            <option value="growth">Growth stage / Post-PMF</option>
          </MySelect>
          <MyTextInput
            label="How many monthly active customers do you currently have?:*"
            name="monthly_users"
            type="text"
            placeholder="0"
          />
          <MyTextInput
            label="Revenue last month(USD):*"
            name="revenue_1mo"
            type="text"
            placeholder="0"
          />
          <MyTextInput
            label="Revenue 2 months ago(USD):*"
            name="revenue_2mo"
            type="text"
            placeholder="0"
          />
          <MyTextInput
            label="Revenue 3 months ago(USD):*"
            name="revenue_3mo"
            type="text"
            placeholder="0"
          />
          <MySelect label="Have you raised capital from investors for your startup?*" name="raised_capital">
            <option value="">Please Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </MySelect>
          <MyTextArea
            label="If yes, how much capital (USD) have you raised, in what format (e.g SAFE, equity, etc), and from whom?"
            name="optional_raised_income"
            type="textarea"
            placeholder="Type here"
          />
          <MySelect label="Founding team size:*" name="founding_team_size">
            <option value="">Please Select</option>
            <option value="1">Solo Founder</option>
            <option value="2">2 Co-Founders</option>
            <option value="3-5">3-5 Co-Founders</option>
            <option value="5+">5+ Co-Founders</option>
          </MySelect>
          <MySelect label="Does the founding team have majority ownership of the company? (Over 51%)*" name="majority_ownership">
            <option value="">Please Select</option>
            <option value="yes">Yes, the founders own 51% or more.</option>
            <option value="no">No, the founders own 49% or less.</option>
          </MySelect>
          <MyTextInput
            label="Estimated Months of Runway:*"
            name="months_runway"
            type="text"
            placeholder="0"
          />
          <MyTextArea
            label="Which countries are you targeting to expand to?*"
            name="targeted_countries"
            type="textarea"
            placeholder="Type here"
          />
          <MyTextArea
            label="What is your current growth strategy?*"
            name="growth_strategy"
            type="textarea"
            placeholder="Tell us about your customer acquisition, retention and expansion strategy."
          />
          <MyTextArea
            label="In which industry does your target customer sit in?*"
            name="industry_target_customer"
            type="textarea"
            placeholder="If your startup targets individual consumers, put 'Customers'."
          />
          <MyTextArea
            label="Customer Focus* POTENTIALLY CHANGE TO MULTIPLE TICKBOXES"
            name="customer_focus"
            type="textarea"
            placeholder="Direct to Consumers, SMEs, Large Enterprises, Government, Others, etc."
          />
          <MySelect label="What phase of the program are you applying for?*" name="phaseType">
            <option value="">Please Select</option>
            <option value="Phase 1">Phase 1</option>
            <option value="Phase 2">Phase 2</option>
            <option value="p1p2">Both Phase 1 and 2</option>
          </MySelect>
          <MyTextArea
            label="What are you hoping to achieve by attending this program?*"
            name="achievement_hope"
            type="textarea"
            placeholder="Type here"
          />
          <MySelect label="How did you hear about us?* CHANGE TO FULL DROPDOWN" name="hear_about">
            <option value="">Please Select</option>
            <option value="p1">Placeholder1</option>
            <option value="p2">Placeholder2</option>
          </MySelect>
          <MyTextArea
            label="Anything else?"
            name="anything_else"
            type="textarea"
            placeholder="Type here"
          />
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

export default function App() {
  return <SignupForm />;
}

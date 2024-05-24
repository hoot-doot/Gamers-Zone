import { useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { shades } from "../../theme";
import Payment from "./Payment";
import Shipping from "./Shipping";
import { loadStripe } from "@stripe/stripe-js";
import KhaltiCheckout from "khalti-checkout-web";

const stripePromise = loadStripe(
  "pk_test_51P2ghyJXCMuwfKcCF0B7nYNQyJYa565ikoUM5Kk7auJaPtrqFufmS6ZGCqYcmHYHEXDcym1q1p7NBDPzQdSRnpVP00q58HKZwY"
);

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    // this copies the billing address onto shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isSecondStep) {
      let config = {
        // replace this key with yours
        "publicKey": "test_public_key_47efbc9b82e848fcbd2579c01cdb3c73",
        "productIdentity": "1234567890",
        "productName": "Drogon",
        "productUrl": "http://gameofthrones.com/buy/Dragons",
        "eventHandler": {
            onSuccess (payload) {
                // hit merchant api for initiating verfication
                console.log(payload);
                console.log("paid")
                
            },
            // onError handler is optional
            onError (error) {
                // handle errors
                console.log(error);
            },
            onClose () {
                console.log('widget is closing');
            }
        },
        "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
      };
      let checkout = new KhaltiCheckout(config);
      checkout.show({amount: 1000});
      
    }

    actions.setTouched({});
  };

  // async function makePayment(values) {
  //   const stripe = await stripePromise;
  //   const requestBody = {
  //     userName: [values.firstName, values.lastName].join(" "),
  //     email: values.email,
  //     products: cart.map(({ _id, count }) => ({
  //       _id,
  //       // name,,
  //       // price,
  //       count,
  //     })),
  //   };

  //   console.log(requestBody);

  //   const response = await fetch("http://localhost:3001/api/orders", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(requestBody),
  //   });
  //   const session = await response.json();
  //   await stripe.redirectToCheckout({
  //     sessionId: session.id,
  //   });
  // }

  // async function khaltipayment(){
  //   console.log("works2");
  //   // const response = await fetch("http://localhost:3001/api/payment", {
  //   //   method: "POST",
  //   //   headers: { "Content-Type": "application/json" },
  //   //   // body: JSON.stringify(requestBody),
  //   // });
  //   let config = {
  //     // replace this key with yours
  //     "publicKey": "test_secret_key_436a5dcd56b44272b64241a359f2c144",
  //     "productIdentity": "1234567890",
  //     "productName": "Drogon",
  //     "productUrl": "http://gameofthrones.com/buy/Dragons",
  //     "eventHandler": {
  //         onSuccess (payload) {
  //             // hit merchant api for initiating verfication
  //             console.log(payload);
  //         },
  //         // onError handler is optional
  //         onError (error) {
  //             // handle errors
  //             console.log(error);
  //         },
  //         onClose () {
  //             console.log('widget is closing');
  //         }
  //     },
  //     "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
  //   };
  //   checkoutRef.current = new KhaltiCheckout(config);
  //  }

  return (
    <Box width="80%" m="100px auto">
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              <Box display="flex" justifyContent="space-between" gap="50px">
                {!isFirstStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      color: "white",
                      borderRadius: 0,
                      padding: "15px 40px",
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.primary[400],
                    boxShadow: "none",
                    color: "white",
                    borderRadius: 0,
                    padding: "15px 40px",
                  }}
                >
                  {!isSecondStep ? "Next" : "Place Order"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().required("required"),
      lastName: yup.string().required("required"),
      country: yup.string().required("required"),
      street1: yup.string().required("required"),
      street2: yup.string(),
      city: yup.string().required("required"),
      state: yup.string().required("required"),
      zipCode: yup.string().required("required"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then:() =>  yup.string().required("required"),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: () => yup.string().required("required"),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: () => yup.string().required("required"),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: () => yup.string().required("required"),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: () => yup.string().required("required"),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then:() =>  yup.string().required("required"),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then:() =>  yup.string().required("required"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().required("required"),
    phoneNumber: yup.string().required("required"),
  }),
];

export default Checkout;

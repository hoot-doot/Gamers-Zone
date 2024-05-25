import { useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { shades } from "../../theme";
import Payment from "./Payment";
import Shipping from "./Shipping";
import KhaltiCheckout from "khalti-checkout-web";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";

const Checkout = () => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;
  const navigate = useNavigate();
  const userId = useSelector((state) => state.cart.user._id);
  console.log(userId);
  let ids = '';
  let names = '';
  let counts = '';
  const totalPricefloat = cart.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);
  const totalPrice = Math.round(totalPricefloat);
  const products= cart.map(({ _id, count }) => ({_id,count}))
  cart.forEach(({ _id, name, count }, index) => {
    ids += `${_id}${index < cart.length - 1 ? ', ' : ''}`;
    names += `${name}${index < cart.length - 1 ? ', ' : ''}`;
    counts += `${count}${index < cart.length - 1 ? ', ' : ''}`;
  });
  console.log(totalPrice)



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
        "productIdentity": ids,
        "productName": names,
        "productUrl": `http://localhost:3000/item/`,
        "eventHandler": {
            onSuccess: async (payload) =>{
                
                // hit merchant api for initiating verfication
                console.log(payload);
                console.log("paid")
                // Send the transaction data to the backend
                const transaction_id = payload.transaction_id;
                console.log(transaction_id);
                try {
                  const response = await fetch('http://localhost:3001/transactions', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      userId,
                      cost: totalPrice.toString(),
                      products: products.map(product => product._id),
                    }),
                  });
                  

                  const result = await response.json();
                  console.log(result);
                  

                  
                } catch (error) {
                  console.error('Error submitting transaction:', error);
                }
                // Send the payload to the '/khalti' endpoint
          try {
            const response2 = await fetch('http://localhost:3001/khalti', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            });

            const result2 = await response2.json();
            console.log(result2);
          } catch (error) {
            console.error('Error submitting to Khalti endpoint:', error);
          }
                navigate("/checkout/success")
            },
            // onError handler is optional
            onError (error) {
                // handle errors
                console.log(error);
            },
            onClose () {
                setActiveStep(1)
                console.log('widget is closing');
            }
        },
        "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
      };
      let checkout = new KhaltiCheckout(config);
      checkout.show({amount : totalPrice});
      
    }

    actions.setTouched({});
  };

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

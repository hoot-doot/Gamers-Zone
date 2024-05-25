import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';

const TermsAndConditions = () => {
  return (
    <Container>
      <Box mt={15}>
        <Typography variant="h1" gutterBottom>
          Terms and Conditions
        </Typography>

        <Typography variant="h3" gutterBottom>
          1. Introduction
        </Typography>
        <Typography paragraph>
          Welcome to UnityHub. These Terms and Conditions ("Terms") govern your use of our website located at www.unityhub.com (the "Site") and any services, products, and content provided by UnityHub (collectively, "Services"). By accessing or using our Services, you agree to comply with and be bound by these Terms. If you do not agree to these Terms, please do not use our Services.
        </Typography>

        <Typography variant="h3" gutterBottom>
          2. Eligibility
        </Typography>
        <Typography paragraph>
          By using our Services, you represent that you are at least 18 years old or have the consent of a parent or guardian, and that you have the legal capacity to enter into this agreement.
        </Typography>

        <Typography variant="h3" gutterBottom>
          3. Account Registration
        </Typography>
        <Typography paragraph>
          To access certain features of our Services, you may need to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information as necessary. You are responsible for safeguarding your account information and for all activities that occur under your account.
        </Typography>

        <Typography variant="h3" gutterBottom>
          4. Orders and Payment
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          4.1 Order Acceptance
        </Typography>
        <Typography paragraph>
          All orders are subject to acceptance by UnityHub. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in product descriptions or pricing, and suspected fraud.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          4.2 Payment
        </Typography>
        <Typography paragraph>
          Payment must be made at the time of purchase. We accept various payment methods, as detailed on our Site. By providing payment information, you represent and warrant that you are authorized to use the payment method.
        </Typography>

        <Typography variant="h3" gutterBottom>
          5. Pricing and Availability
        </Typography>
        <Typography paragraph>
          All prices are listed in the currency stated on the Site and are subject to change without notice. UnityHub endeavors to provide accurate product and pricing information but errors may occur. If we discover an error in pricing or availability, we will notify you and provide you with the option to confirm the order at the correct price or cancel it.
        </Typography>

        <Typography variant="h3" gutterBottom>
          6. Shipping and Delivery
        </Typography>
        <Typography paragraph>
          UnityHub will process and ship orders according to the shipping method selected at checkout. Delivery times are estimates and may vary. We are not responsible for delays caused by shipping carriers or events beyond our control.
        </Typography>

        <Typography variant="h3" gutterBottom>
          7. Returns and Refunds
        </Typography>
        <Typography paragraph>
          We accept returns for most products within 30 days of purchase. Items must be returned in their original condition with all packaging and accessories. To initiate a return, please contact our customer service. Refunds will be issued to the original payment method. Certain items may be subject to restocking fees or may be non-returnable; these items will be clearly marked on the Site.
        </Typography>

        <Typography variant="h3" gutterBottom>
          8. Intellectual Property
        </Typography>
        <Typography paragraph>
          All content on the Site, including but not limited to text, graphics, logos, images, and software, is the property of UnityHub or its content suppliers and is protected by intellectual property laws. You may not use, reproduce, distribute, or create derivative works of our content without our express written permission.
        </Typography>

        <Typography variant="h3" gutterBottom>
          9. User Conduct
        </Typography>
        <Typography paragraph>
          You agree not to use our Services for any unlawful purpose or in any way that could harm UnityHub or its users. Prohibited activities include, but are not limited to:
          <ul>
            <li>Engaging in fraudulent activities</li>
            <li>Posting or transmitting any unlawful, defamatory, or obscene material</li>
            <li>Attempting to gain unauthorized access to our systems or accounts</li>
            <li>Interfering with the operation of the Site or Services</li>
          </ul>
        </Typography>

        <Typography variant="h3" gutterBottom>
          10. Disclaimers and Limitation of Liability
        </Typography>
        <Typography paragraph>
          Our Services are provided "as is" and "as available" without warranties of any kind, either express or implied. UnityHub does not warrant that the Services will be uninterrupted or error-free. To the fullest extent permitted by law, UnityHub disclaims all warranties, express or implied, including but not limited to, implied warranties of merchantability and fitness for a particular purpose.
        </Typography>
        <Typography paragraph>
          In no event shall UnityHub be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our Services.
        </Typography>

        <Typography variant="h3" gutterBottom>
          11. Indemnification
        </Typography>
        <Typography paragraph>
          You agree to indemnify, defend, and hold harmless UnityHub and its affiliates, officers, directors, employees, and agents from any claims, damages, losses, liabilities, costs, and expenses arising out of or related to your use of the Services or violation of these Terms.
        </Typography>

        <Typography variant="h3" gutterBottom>
          12. Changes to Terms
        </Typography>
        <Typography paragraph>
          UnityHub reserves the right to modify these Terms at any time. Any changes will be effective immediately upon posting on the Site. Your continued use of the Services after the posting of revised Terms constitutes your acceptance of the changes.
        </Typography>

        <Typography variant="h3" gutterBottom>
          13. Governing Law
        </Typography>
        <Typography paragraph>
          These Terms and any disputes arising out of or related to them shall be governed by and construed in accordance with the laws of the jurisdiction where UnityHub is headquartered, without regard to its conflict of law principles.
        </Typography>

        <Typography variant="h3" gutterBottom>
          14. Contact Information
        </Typography>
        <Typography paragraph>
          If you have any questions about these Terms, please contact us at:
        </Typography>
        <Typography paragraph>
          <strong>UnityHub Customer Service</strong><br />
          Email: <Link href="mailto:devanshashrestha123@gmail.com">devanshashrestha123@gmail.com</Link><br />
          Phone: (977) 9819183781<br />
          Address: 123 Gaming Avenue, GameCity, GC 12345
        </Typography>

        <Typography paragraph>
          By using UnityHub, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsAndConditions;

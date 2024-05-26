import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container>
      <Box mt={15}>
        <Typography variant="h1" gutterBottom>
          Privacy Policy
        </Typography>

        <Typography variant="h3" gutterBottom>
          1. Introduction
        </Typography>
        <Typography paragraph>
          Gamers Zone ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, www.Gamers Zone.com (the "Site"), and use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
        </Typography>

        <Typography variant="h3" gutterBottom>
          2. Information We Collect
        </Typography>
        <Typography paragraph>
          We may collect information about you in a variety of ways. The information we may collect on the Site includes:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          2.1 Personal Data
        </Typography>
        <Typography paragraph>
          Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us when you register with the Site or when you choose to participate in various activities related to the Site.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          2.2 Derivative Data
        </Typography>
        <Typography paragraph>
          Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          2.3 Financial Data
        </Typography>
        <Typography paragraph>
          Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our services from the Site.
        </Typography>

        <Typography variant="h3" gutterBottom>
          3. Use of Your Information
        </Typography>
        <Typography paragraph>
          Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
        </Typography>
        <Typography component="ul">
          <li>Process your transactions.</li>
          <li>Manage your account and provide customer support.</li>
          <li>Send you a newsletter.</li>
          <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Site.</li>
          <li>Increase the efficiency and operation of the Site.</li>
          <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
          <li>Notify you of updates to the Site and services.</li>
          <li>Offer new products, services, and/or recommendations to you.</li>
        </Typography>

        <Typography variant="h3" gutterBottom>
          4. Disclosure of Your Information
        </Typography>
        <Typography paragraph>
          We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          4.1 By Law or to Protect Rights
        </Typography>
        <Typography paragraph>
          If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          4.2 Third-Party Service Providers
        </Typography>
        <Typography paragraph>
          We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          4.3 Business Transfers
        </Typography>
        <Typography paragraph>
          We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
        </Typography>

        <Typography variant="h3" gutterBottom>
          5. Security of Your Information
        </Typography>
        <Typography paragraph>
          We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
        </Typography>

        <Typography variant="h3" gutterBottom>
          6. Policy for Children
        </Typography>
        <Typography paragraph>
          We do not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected personal information from a child under age 13 without verification of parental consent, we will delete that information as quickly as possible. If you become aware of any data we have collected from children under age 13, please contact us at support@Gamers Zone.com.
        </Typography>

        <Typography variant="h3" gutterBottom>
          7. Changes to This Privacy Policy
        </Typography>
        <Typography paragraph>
          We may update this Privacy Policy from time to time in order to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on our Site. You are advised to review this Privacy Policy periodically for any changes.
        </Typography>

        <Typography variant="h3" gutterBottom>
          8. Contact Us
        </Typography>
        <Typography paragraph>
          If you have questions or comments about this Privacy Policy, please contact us at:
        </Typography>
        <Typography paragraph>
          <strong>Gamers Zone Customer Service</strong><br />
          Email: <Link href="mailto:richardtumb3132@gmail.com
">richardtumb3132@gmail.com</Link><br />
          Phone: (977) 9819183781<br />
          Address: 123 Gaming Avenue, GameCity, GC 12345
        </Typography>

        <Typography paragraph>
          By using Gamers Zone, you acknowledge that you have read, understood, and agreed to this Privacy Policy.
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;

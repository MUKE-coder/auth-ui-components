
import * as React from 'react';
import { Html, Head, Body, Container, Text, Heading, Section, Link } from '@react-email/components';

interface ResetPasswordTemplateProps {
  url: string;
}

export const ResetPasswordTemplate: React.FC<ResetPasswordTemplateProps> = ({ url }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Reset your password</Heading>
        <Text style={text}>Click the link below to reset your password. If you didn't request this, please ignore this email.</Text>
        <Section style={btnContainer}>
          <Link href={url} style={button}>
            Reset Password
          </Link>
        </Section>
        <Text style={text}>
            Or copy and paste this URL into your browser:
            <br />
            <Link href={url} style={link}>{url}</Link>
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '560px',
};

const h1 = {
  fontSize: '24px',
  fontWeight: 'bold',
  paddingTop: '32px',
  paddingBottom: '32px',
};

const text = {
  fontSize: '16px',
  lineHeight: '26px',
};

const btnContainer = {
  textAlign: 'center' as const,
  margin: '20px 0',
};

const button = {
  backgroundColor: '#0070f3',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  width: '100%',
  padding: '12px 20px',
};

const link = {
    color: '#0070f3',
    textDecoration: 'underline',
};

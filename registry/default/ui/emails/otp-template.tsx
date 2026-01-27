import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Heading,
  Section,
} from "@react-email/components";

interface OTPTemplateProps {
  otp: string;
}

export const OTPTemplate: React.FC<OTPTemplateProps> = ({ otp }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Verification Code</Heading>
        <Text style={text}>Your verification code is:</Text>
        <Section style={codeBox}>
          <Text style={code}>{otp}</Text>
        </Section>
        <Text style={text}>It will expire in 10 minutes.</Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "560px",
};

const h1 = {
  fontSize: "24px",
  fontWeight: "bold",
  paddingTop: "32px",
  paddingBottom: "32px",
};

const text = {
  fontSize: "16px",
  lineHeight: "26px",
};

const codeBox = {
  background: "#f4f4f4",
  borderRadius: "4px",
  margin: "16px 0",
  padding: "16px",
  textAlign: "center" as const,
};

const code = {
  fontSize: "24px",
  fontWeight: "bold",
  letterSpacing: "4px",
  margin: "0",
};

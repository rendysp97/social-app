import Forms from "@/components/forms";
import { useState, useContext } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Image,
  Heading,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Box,
} from "@chakra-ui/react";

import NextLink from "next/link";

import Inputs from "@/components/input";
import { AuthContext } from "@/context/auth_context";

export default function Register() {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    hobby: "",
    phone: "",
    date: "",
  });

  const { register } = useContext(AuthContext);

  const handleInput = (event) => {
    const { value, name } = event.target;

    console.log(value);

    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await register(input);

    console.log("berhasil");
  };

  return (
    <Box padding={10}>
      <Forms
        image={
          "https://img.freepik.com/free-vector/business-people-writing-agreement-shaking-hands-tiny-man-with-magnifying-glass-researching-checklist-document-clipboard-paper-flat-vector-illustration-survey-paperwork-management-concept_74855-21676.jpg?ga=GA1.1.1771984018.1712351535&semt=ais_hybrid"
        }
      >
        <CardBody>
          <Text as={"b"} textAlign={"center"} fontSize={25} marginBottom={10}>
            Register To Your Account
          </Text>
          <FormControl padding={2}>
            <Inputs
              name="name"
              placeholder="Input Your Name"
              onchange={handleInput}
              val={input.name}
            />
            <Inputs
              name="email"
              placeholder="Input Your Email"
              type="email"
              onchange={handleInput}
              val={input.email}
            />
            <Inputs
              name="date"
              placeholder="Input Your Birth"
              type="date"
              onchange={handleInput}
              val={input.date}
            />
            <Inputs
              name="phone"
              placeholder="Input Your Phone"
              type="number"
              onchange={handleInput}
              val={input.phone}
            />
            <Inputs
              name="hobby"
              placeholder="Input Your Hobby"
              onchange={handleInput}
              val={input.hobby}
            />
            <Inputs
              name="password"
              placeholder="Input Your Password"
              type="password"
              onchange={handleInput}
              val={input.password}
            />
          </FormControl>
        </CardBody>

        <CardFooter>
          <Button
            variant="solid"
            colorScheme="blue"
            width={"100%"}
            borderRadius={20}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
        </CardFooter>
        <Text padding={2} textAlign={"center"}>
          Already Have Account?
          <Link as={NextLink} href="/auth/login">
            Sign In
          </Link>
        </Text>
      </Forms>
    </Box>
  );
}

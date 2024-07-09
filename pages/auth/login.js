import Forms from "@/components/forms";
import Inputs from "@/components/input";
import { useState, useContext } from "react";
import {
  CardBody,
  CardFooter,
  Text,
  Button,
  FormControl,
  Link,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { AuthContext } from "@/context/auth_context";
import { useRouter } from "next/router";

export default function Login() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const toast = useToast();

  const { login } = useContext(AuthContext);

  const handleInput = (event) => {
    const { value, name } = event.target;

    console.log(value);

    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await login(input);

    if (result.success) {
      toast({
        title: "Login Success.",
        description: "We've log into your account",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      router.push("/dashboard");
      
    } else {
      toast({
        title: "Error.",
        description: "Usernama and Password invalid.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.log("Login failed:", result.message);
     
    }
  };

  return (
    <Forms
      image={
        "https://img.freepik.com/free-vector/account-concept-illustration_114360-399.jpg?w=1060&t=st=1720173792~exp=1720174392~hmac=a627c13d8add20690265449802195c40dedfd214c25c1794c3e9ef3b0650c98d"
      }
    >
      <CardBody>
        <Text as="b" textAlign="center" fontSize={25} marginBottom={10}>
          Login To Your Account
        </Text>

        <form>
          <FormControl padding={5}>
            <Inputs
              name="email"
              id="email"
              type="email"
              placeholder="Input Your Email"
              onchange={handleInput}
              value={input.email}
            />
            <Inputs
              id="password"
              name="password"
              type="password"
              placeholder="Input Your password"
              onchange={handleInput}
              value={input.password}
            />
          </FormControl>
        </form>
      </CardBody>

      <CardFooter>
        <Button
          variant="solid"
          colorScheme="blue"
          width="100%"
          borderRadius={20}
          onClick={handleSubmit}
        >
          Sign In
        </Button>
      </CardFooter>
      <Text padding={2} textAlign="center">
        Not Have Account?
        <Link as={NextLink} href="/auth/register">
          Register
        </Link>
      </Text>
    </Forms>
  );
}

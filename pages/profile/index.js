import Cards from "@/components/card";
import Inputs from "@/components/input";
import { AuthContext } from "@/context/auth_context";
import Layout from "@/layout";
import { Avatar, Box, Flex, Input, Text, IconButton } from "@chakra-ui/react";
import { useContext } from "react";

export default function profile({ data }) {
  const { me } = useContext(AuthContext);

  return (
    <Layout metaTitle="Profile">
      <Box p={20}>
        <Flex alignItems={"center"}>
          <Avatar size="2xl" name={me?.name} />
          <Flex direction={"column"} marginLeft={20}>
            <Text fontSize="2xl">{me?.name}</Text>
            <Text fontSize="2xl">{me?.email}</Text>
          </Flex>
        </Flex>

        <Box my={20}>
          <Inputs mb={10} val={me?.name} name={"Name"} />
          <Inputs mb={10} val={me?.email} name={"Email"} />
          <Inputs mb={10} val={me?.dob || "-"} name={"Date Of Birth"} />
          <Inputs mb={10} val={me?.phone || "-"} name={"Phone"} />
          <Inputs mb={10} val={me?.hobby || "-"} name={"Hobby"} />
        </Box>

        {data?.data.map((item) => (
          <Box mb={10}>
            <Cards
              name={item.user.name}
              desc={item.description}
              email={item.user.email}
            />
          </Box>
        ))}
      </Box>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  try {
    const token = context.req.cookies.token;

    const res = await fetch(
      "https://service.pace-unv.cloud/api/posts?type=me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return {
      props: {
        data: null,
      },
    };
  }
}

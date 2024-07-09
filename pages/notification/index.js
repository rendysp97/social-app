import Layout from "@/layout";
import { Card, CardBody, Text, Box, Flex, Avatar } from "@chakra-ui/react";

const notification = ({ data }) => {
  return (
    <>
      <Layout>
        {data.data.map((item) => (
          <Box padding={5}>
            <Card>
              <CardBody>
                <Flex alignItems="center">
                  <Avatar name={item.user.name} />
                  <Text ml={5}>
                    {item.user.name} {item.remark} posts
                  </Text>
                </Flex>
              </CardBody>
            </Card>
          </Box>
        ))}
      </Layout>
    </>
  );
};

export default notification;

export async function getServerSideProps(context) {
  try {
    const token = context.req.cookies.token;

    const res = await fetch(
      "https://service.pace-unv.cloud/api/notifications",
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

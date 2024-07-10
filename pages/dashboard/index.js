import { SimpleGrid } from "@chakra-ui/react";

import Cards from "@/components/card";

import Layout from "@/layout";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/auth_context";
import Loading from "@/components/loading";

export default function dashboard({ data }) {
  const [isLoading, setIsLoading] = useState(true);
  const { getMe } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      await getMe();
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Layout metaTitle="Dashboard">
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={4}
          mt={4}
          padding={20}
        >
          {data?.data?.map((item) => (
            <React.Fragment key={item.id}>
              <Cards
                ownPost={item.is_own_post}
                replies={item.replies_count}
                count={item.likes_count}
                like={item.is_like_post}
                id={item.id}
                name={item.user.name}
                desc={item.description}
                email={item.user.email}
              />
            </React.Fragment>
          ))}
        </SimpleGrid>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const token = context.req.cookies.token;

    const res = await fetch(
      "https://service.pace-unv.cloud/api/posts?type=all",
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

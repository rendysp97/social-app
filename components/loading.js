
import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

const LottieAnimation = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
    >
      <Player
        autoplay
        loop
        src={require("../utils/loading.json")}
        style={{ height: "500px", width: "500px" }}
      />
    </Box>
  );
};

export default LottieAnimation;



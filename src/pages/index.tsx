import React from "react";
import { Box } from "@mui/material";
import { TruncateText } from "@/components";

export default function Home() {
  const text =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  return (
    <Box
      sx={{
        width: "100%",
        // height: "100vh",
        backgroundColor: "red",

        display: "flex",
        flexDirection: "column",
        placeContent: "center",
        placeItems: "center",

        gap: "8px",
      }}
    >
      {Array.from({ length: 100 })
        .fill(1)
        .map((item, index) => {
          return (
            <TruncateText
              key={index}
              sx={{ width: "300px", height: "60px", backgroundColor: "green" }}
              text={`${index + 1} ${text}`}
              suffix={
                <Box sx={{ display: "inline-flex", color: "blue" }}>
                  <span>...</span>
                  <button>Read more</button>
                </Box>
              }
            />
          );
        })}
    </Box>
  );
}

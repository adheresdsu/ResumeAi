import { ImageResponse } from "next/og";

import { anniversaryContent } from "@/src/data/anniversary";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "14px",
          color: "#FBF3E7",
          border: "2px solid rgba(212, 179, 119, 0.6)",
          background:
            "radial-gradient(circle at 18% 18%, rgba(212, 179, 119, 0.22), transparent 52%), linear-gradient(145deg, #521f39 0%, #291326 55%, #12090f 100%)",
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: "0.14em",
        }}
      >
        {anniversaryContent.profile.initials}
      </div>
    ),
    {
      ...size,
    },
  );
}

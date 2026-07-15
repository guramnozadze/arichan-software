import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageAlt =
  "Arichan Software - independent software studio by Guram Nozadze";
export const ogImageContentType = "image/png";

async function loadAssets() {
  const fontsDir = join(process.cwd(), "app/og-fonts");

  const [anton, plexMono, instrumentSans, monogram] = await Promise.all([
    readFile(join(fontsDir, "Anton-Regular.ttf")),
    readFile(join(fontsDir, "IBMPlexMono-Medium.ttf")),
    readFile(join(fontsDir, "InstrumentSans-Regular.ttf")),
    readFile(join(fontsDir, "monogram-mark.png"), "base64"),
  ]);

  return {
    anton,
    plexMono,
    instrumentSans,
    monogramSrc: `data:image/png;base64,${monogram}`,
  };
}

export async function renderOgImage() {
  const { anton, plexMono, instrumentSans, monogramSrc } = await loadAssets();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          background:
            "radial-gradient(circle at 84% 92%, rgba(139,48,224,0.4), rgba(10,9,13,0) 55%), #0a090d",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- satori markup, next/image cannot render inside ImageResponse */}
          <img src={monogramSrc} alt="" width={52} height={52} />
          <span
            style={{
              fontFamily: "IBM Plex Mono",
              fontSize: 20,
              letterSpacing: "0.22em",
              color: "#be7cff",
            }}
          >
            GURAM NOZADZE · INDEPENDENT SOFTWARE STUDIO
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Anton",
            textTransform: "uppercase",
            lineHeight: 0.86,
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ fontSize: 136, color: "#f1ead8" }}>Arichan</span>
          <span style={{ fontSize: 136, color: "#be7cff" }}>Software</span>
        </div>

        <span
          style={{
            fontFamily: "Instrument Sans",
            fontSize: 26,
            color: "#8e8779",
            maxWidth: 760,
          }}
        >
          Marketplaces, AI tools and SaaS - designed, built and shipped.
        </span>
      </div>
    ),
    {
      ...ogImageSize,
      fonts: [
        { name: "Anton", data: anton, style: "normal", weight: 400 },
        {
          name: "IBM Plex Mono",
          data: plexMono,
          style: "normal",
          weight: 500,
        },
        {
          name: "Instrument Sans",
          data: instrumentSans,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}

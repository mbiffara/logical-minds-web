type Variant = "white" | "color" | "dark";

export default function Logo({ variant = "white", height = 22 }: { variant?: Variant; height?: number }) {
  const src =
    variant === "color" || variant === "dark"
      ? "/assets/logo-wordmark-color.svg"
      : "/assets/logo-wordmark-white.svg";
  return (
    <img
      src={src}
      alt="Logical Minds"
      style={{ height, width: "auto", display: "block" }}
    />
  );
}

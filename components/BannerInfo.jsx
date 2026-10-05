import { Banner } from "@primer/react";
import { BannerDescription } from "node_modules/@primer/react/dist/Banner/Banner";

export default function BannerInfo({ title, description, variant }) {
  return (
    <Banner variant={variant}>
      <Banner.Title>{title}</Banner.Title>
      <BannerDescription>{description}</BannerDescription>
    </Banner>
  );
}

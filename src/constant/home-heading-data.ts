import {
  kentHeading,
  aquaguardHeading,
  livepureHeading,
} from "../assets";

import { homeHeadingDateType } from "../interfaces/Home-Interfaces";

export const HomeHeadingData = [
  {
    Title: "Livpure Purifiers",
    SubTitle: "7-stage purification process",
    Desc: "Livpure purifiers deliver purity you can trust. With advanced technology and a commitment to quality, Livpure offers a range of purifiers ensuring clean and safe drinking water for your family's well-being",
    Image: livepureHeading,
  },
  {
    Title: "Aquaguard Purifiers",
    SubTitle: "India's No. 1 brand",
    Desc: "Aquaguard water purifiers are synonymous with purity and reliability. Utilizing cutting-edge technology, Aquaguard purifiers ensure that every drop of water is free from harmful contaminants, providing your family with clean and safe drinking water. With a commitment to excellence, Aquaguard offers a range of purifiers tailored to meet your specific needs, ensuring optimal health and well-being for you and your loved ones",
    Image: aquaguardHeading,
  },
  {
    Title: "Kent Purifiers",
    SubTitle: "Trusted by worldwide",
    Desc: "Kent water purifiers provide advanced filtration technology, ensuring clean and safe drinking water. With innovative features and reliable performance, Kent purifiers remove impurities to deliver pure and healthy water for your family's well-being.",
    Image: kentHeading,
  },
] as homeHeadingDateType[];

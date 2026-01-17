import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

export const contactInfo = {
  phone: "+0123 456 789",
  email: "support@shopsphere.com",
  address: "123 Commerce Street, Tech City, TC 90210",
  mapLink: "https://maps.app.goo.gl/VDk99CEBRomAdEHv9",
};

export const footerData = {
  about:
    "ShopSphere is your one-stop destination for quality products, secure payments, and fast delivery.",
  contact: contactInfo,
  navigation: [
    {
      title: "Explore",
      links: [
        { label: "About Us", url: "/about" },
        { label: "Services", url: "/services" },
        { label: "Shopping Guide", url: "/guide" },
        { label: "FAQs", url: "/faq" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Returns", url: "/returns" },
        { label: "Shipping", url: "/shipping" },
        { label: "Terms", url: "/terms" },
        { label: "Privacy", url: "/privacy" },
      ],
    },
    {
      title: "Account",
      links: [
        { label: "Sign In", url: "/login" },
        { label: "My Cart", url: "/cart" },
        { label: "Track Order", url: "/track" },
        { label: "Help", url: "/help" },
      ],
    },
  ],
};

export const contactDetails = [
  {
    label: "Phone",
    value: contactInfo.phone,
    href: `tel:${contactInfo.phone}`,
    icon: FiPhone,
  },
  {
    label: "Email",
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
    icon: FiMail,
  },
  {
    label: "Address",
    value: contactInfo.address,
    href: contactInfo.mapLink,
    icon: FiMapPin,
  },
];

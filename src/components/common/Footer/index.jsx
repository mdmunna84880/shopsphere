import React from "react";
import { CiMail } from "react-icons/ci";
import { FiSend } from "react-icons/fi";

import logo from "assets/brand/logo.png";
import Container from "components/ui/Container";
import { contactDetails, footerData } from "./footerData";
import { paymentMethods } from "./paymentMethod";
import { socialLinks } from "./socialLinks";
import Button from "components/ui/Button";

function Footer() {
// Getting year by calling getFullYear function
const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface w-full border-t border-subtle shadow-lg">
      <Container className="grid grid-cols-1 lg:grid-cols-12 py-8 h-full w-full">
        <div className="lg:col-span-3">
          <div>
            <img src={logo} alt="Logo of Shopsphere" className="h-8 inline-block" />
          </div>
          <p className="mt-4 text-main max-w-xs">{footerData.about}</p>
          <div className="mt-6">
            {contactDetails.map(({ label, value, href, icon }) => {
              const Icon = icon;
              return (
                <p key={label}>
                  <a href={href} className="flex items-center gap-3 pb-1">
                    <Icon className="text-accent" />{" "}
                    <span className="text-muted">{value}</span>
                  </a>
                </p>
              );
            })}
          </div>
        </div>
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 justify-center text-center sm:text-left mt-8 gap-8 lg:gap-0 lg:mt-0">
          {footerData.navigation.map((col) => (
            <div key={col.title} className="sm:col-span-1 lg:col-span-4">
              <h3 className="text-main text-xl font-medium">{col.title}</h3>
              <ul>
                {col.links.map((item) => (
                  <li key={item.url}>
                    <a
                      href={item.url}
                      className="text-muted hover:text-main transition"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="lg:col-span-3 mt-8 lg:mt-0 sm:block flex flex-col items-center">
          <div>
            <h3 className="flex items-center text-main text-xl font-medium pb-2">
            <span className="pr-2 text-primary">
              <FiSend />
            </span>{" "}
            Stay in the loop
          </h3>
          <p className="pb-4 text-main max-w-sm">
            Get updates on new arrivals and exclusive offers directly to your
            inbox.
          </p>
          <form onClick={(e) => e.preventDefault()} className="max-w-xs flex flex-col items-end">
            <div className="flex  group bg-page w-full max-w-xs items-center border border-subtle rounded-md px-2 py-1 focus-within:ring-1 focus-within:ring-accent/40">
              <div className="p-0.5">
                <CiMail className="group-focus-within:text-main text-muted text-lg" />
              </div>
              <input
                type="email"
                className="outline-none w-full"
                placeholder="Enter your email"
              ></input>
            </div>
            <Button
              type="submit"
              className="mt-3"
            >
              Subscribe
            </Button>
          </form>
          </div>
        </div>
      </Container>
      <Container className="flex flex-col gap-4 md:flex-row justify-between items-center py-8 bg-page">
        <p className="text-muted text-xs order-3 md:order-1">&copy; {currentYear} ShopSphere. All rights reserved.</p>
        <div className="flex items-center gap-3 order-2">
            {paymentMethods.map(({name, icon})=>{
                const Icon = icon;
                return <Icon key={name} title={name} className="text-lg text-muted"/>
            })}
        </div>
        <div className="flex items-center gap-1 order-1 md:order-3">
            {socialLinks.map(({label, href, icon})=>{
                const Icon = icon;
                return <a key={href} href={href} target="_blanck" rel="noopener noreferrer" className="cursor-pointer text-muted hover:bg-black/10 p-2 rounded-md hover:text-main"><Icon title={label}/></a>
            })}
        </div>
      </Container>
    </footer>
  );
}

export default Footer;

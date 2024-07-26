import { Event } from "@/models/Event";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faTelegram,
  faTiktok,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLink,
  faLocationDot,
  faMobile,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import {btoa} from "next/dist/compiled/@edge-runtime/primitives";
import Image from "next/image";
import Link from "next/link";

export const buttonsIcons = {
  email: faEnvelope,
  mobile: faPhone,
  instagram: faInstagram,
  facebook: faFacebook,
  discord: faDiscord,
  tiktok: faTiktok,
  youtube: faYoutube,
  whatsapp: faWhatsapp,
  github: faGithub,
  telegram: faTelegram,
};

function buttonLink(key, value) {
  if (key === "mobile") {
    return "tel:" + value;
  }
  if (key === "email") {
    return "mailto:" + value;
  }
  return value;
}

export default async function UserPage({ params }) {
  const uri = params.uri;
  mongoose.connect(process.env.MONGO_URI);
  // const page = await Page.findOne({uri});
  // const user = await User.findOne({email:page.owner});
  // console.log(user.email)
  // console.log(page.owner)
  console.log("Looking for page with URI:", uri);
  const page = await Page.findOne({ uri });

  if (!page) {
    console.error("No page found for URI:", uri);
    return { notFound: true }; // or handle the not found case as appropriate
  }

  console.log("Page found:", page);
  const user = await User.findOne({ email: page.owner });

  if (!user) {
    console.error("No user found with email:", page.owner);
    return { notFound: true }; // or handle the not found case as appropriate  
  }
  console.log("User found:", user);
    await Event.create({uri:uri, page:uri, type:'view'});
  return (
    <div
      className=" text-white min-h-screen bg-center bg-fixed"
      style={
        page.bgType === "color"
          ? { backgroundColor: page.bgColor }
          : { backgroundImage: `url(${page.bgImage})` }
      }
    >
      <div className=" backdrop-blur-[8px] bg-black/50 min-h-screen w-full ">
        <div className="aspect-square w-[110px] h-[110px] mx-auto relative top-16 mb-[90px]">
          <Image
            className="rounded-full w-full h-full object-cover"
            src={user.image}
            alt="avatar"
            width={256}
            height={256}
          />
        </div>
        <div className=" mb-6">
          <h2 className="text-2xl text-center mb-1 font-bold font-sans">
            {page.displayName}
          </h2>
          <h3 className="text-md flex gap-2 justify-center font-bold items-center text-sky-400">
            <FontAwesomeIcon className="h-4" icon={faLocationDot} />
            <span>{page.location}</span>
          </h3>
          <div className="max-w-xs mx-auto text-center my-2 text-gray-200">
            <p>{page.bio}</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto grid grid-cols-1 gap-8 text-black p-4 px-8 ">
          {page.links.map((link) => (
            <Link
              key={link.url}
              target="_blank"
              ping={process.env.URL+'/api/click?url='+ btoa(link.url)+'&page='+page.uri}
              className="bg-white  flex shadow-md shadow-black/80 rounded-md hover:scale-105 transition-transform duration-100 items-center "
              href={link.url}
            >
              <div className="aspect-square w-[58px] h-[48px] m-3 justify-center flex items-center">
                {link.icon && (
                  <Image
                    className="rounded-md w-full h-full object-cover "
                    src={link.icon}
                    alt={"icon"}
                    width={48}
                    height={48}
                  />
                )}
                {!link.icon && (
                  <FontAwesomeIcon icon={faLink} className="w-8 h-8" />
                )}
              </div>
              <div className="text-center mx-auto overflow-hidden ">
                <h1 className=" font-bold text-gray-600 text-lg mr-16">
                  {link.title}
                </h1>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex gap-4 justify-center mt-[100px] pb-4">
          {Object.keys(page.buttons).map((buttonKey) => (
            <Link
              key={buttonKey}
              href={buttonLink(buttonKey, page.buttons[buttonKey])}
              className="rounded-full bg-white text-blue-950 p-2 flex items-center justify-center shadow shadow-black hover:scale-110 transition-transform duration-300"
            >
              <FontAwesomeIcon
                className="w-5 h-5"
                icon={buttonsIcons[buttonKey]}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

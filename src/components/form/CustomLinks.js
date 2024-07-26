'use client';
import SubmitButton from "@/components/buttons/SubmitButton";
import {upload} from "@/libs/upload";
import {faCloudArrowUp, faGripLines, faLink, faPlus, faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {useState} from "react";
import toast from "react-hot-toast";
import {ReactSortable} from "react-sortablejs";
import Box from "../layout/Box";
import { savePageLinks } from "@/app/actions/PageForm";

export default function CustomLinks({page,user}) {
  const [links,setLinks] = useState(page.links || []);
  async function save() {
    await savePageLinks(links);
    toast.success('Saved!');
  }
  function addNewLink() {
    setLinks(prev => {
      return [...prev, {
        key: Date.now().toString(),
        title:'',
        subtitle:'',
        icon:'',
        url:'',
      }];
    });
  }
  function handleUpload(ev, linkKeyForUpload) {
    upload(ev, uploadedImageUrl => {
      setLinks(prevLinks => {
        const newLinks = [...prevLinks];
        newLinks.forEach((link,index) => {
          if (link.key === linkKeyForUpload) {
            link.icon = uploadedImageUrl;
          }
        });
        return newLinks;
      });
    });
  }
  function handleLinkChange(keyOfLinkToChange, prop, ev) {
    setLinks(prev => {
      const newLinks = [...prev];
      newLinks.forEach((link) => {
        if (link.key === keyOfLinkToChange) {
          link[prop] = ev.target.value;
        }
      });
      return [...prev];
    })
  }
  function removeLink(linkKeyToRemove) {
    setLinks(prevLinks =>
      [...prevLinks].filter(l => l.key !== linkKeyToRemove)
    );
  }
  return (
    <Box>
      <form action={save}>
        <h2 className="text-2xl font-bold mb-4">Custom Links</h2>
        <button
          onClick={addNewLink}
          type="button"
          className="text-blue-500 text-lg flex gap-2 items-center cursor-pointer">
          <FontAwesomeIcon className="bg-blue-500 text-white p-1 rounded-full aspect-square" icon={faPlus} />
          <span>Add new</span>
        </button>
        <div className="">
          <ReactSortable
            handle={'.handle'}
            list={links} setList={setLinks}>
            {links.map(l => (
              <div key={l.key} className="mt-8 md:flex gap-6 items-center">
                <div className="handle">
                  <FontAwesomeIcon
                    className="text-gray-500 mr-2 cursor-ns-resize"
                    icon={faGripLines} />
                </div>
                <div className="text-center">
                  <div className="bg-gray-300 relative aspect-square overflow-hidden w-16 h-16 inline-flex justify-center items-center">
                    {l.icon && (
                      <Image
                        className="w-full h-full object-cover"
                        src={l.icon}
                        alt={'icon'}
                        width={64} height={64} />
                    )}
                    {!l.icon && (
                      <FontAwesomeIcon size="xl" icon={faLink} />
                    )}
                  </div>
                  <div>
                    <input
                      onChange={ev => handleUpload(ev,l.key)}
                      id={'icon'+l.key}
                      type="file"
                      className="hidden"/>
                    <label htmlFor={'icon'+l.key} className="border mt-2 p-2 flex items-center gap-1 text-blue-500  hover:bg-blue-500 hover:text-white cursor-pointer mb-2 justify-center">
                      <FontAwesomeIcon icon={faCloudArrowUp} />
                      <span>Change icon</span>
                    </label>
                    <button
                      onClick={() => removeLink(l.key)}
                      type="button" className="w-full bg-white border py-2 px-3 mb-2 h-full flex gap-2 items-center justify-center  hover:bg-red-400 hover:text-white text-red-400">
                      <FontAwesomeIcon icon={faTrash} />
                      <span className="">Remove link</span>
                    </button>
                  </div>
                </div>
                <div className=" grow flex-col md:flex-row gap-24">
                    <div className=" gap-2 shadow shadow-black/30 max-w-3xl flex items-center justify-center">
                    <label className="input-label w-8 mt-2 px-1">Title:</label>
                  <input
                    className=" outline-none p-2 w-full"
                    value={l.title}
                    onChange={ev => handleLinkChange(l.key, 'title', ev)}
                    type="text" placeholder="title"/>
                    </div>
                    <div className=" gap-2 shadow shadow-black/30 max-w-3xl flex items-center justify-center mt-3">
                    <label className="input-label w-8 mt-2 px-1">Url:</label>
                  <input
                    className=" outline-none p-2 w-full"
                    value={l.url}
                    onChange={ev => handleLinkChange(l.key, 'url', ev)}
                    type="text" placeholder="https://"/>
                    </div>
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>
        <div className="border-t pt-4 mt-4">
          <SubmitButton className="max-w-xs mx-auto">
            <FontAwesomeIcon icon={faSave} />
            <span>Save</span>
          </SubmitButton>
        </div>
      </form>
    </Box>
  );
}
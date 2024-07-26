'use client'
import React, { useState } from "react";
import RadioToggle from "../buttons/RadioToggle";
import {faCamera, faCloudArrowDown, faImage, faPalette} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import SubmitButton from "../buttons/SubmitButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-regular-svg-icons";
import PageForm from "@/app/actions/PageForm";
import toast from "react-hot-toast";
import Box from "../layout/Box";

const PageSettings = ({ page,user }) => { //user 4:28 hr
  const [bgType, setBgType] = useState(page.bgType);
  const [bgColor, setBgColor] = useState(page.bgColor);
  const [bgImage, setBgImage] = useState(page.bgImage);
  const [avatar, setAvatar] = useState(user?.image);


  const upload = async(ev,cb)=>{
    const file = ev.target.files?.[0];
      if(file){
        const UpPromise = new Promise((resolve,reject)=>{
          const data = new FormData;
          data.set('file',file);
          fetch('/api/upload',{
            method: 'POST',
            body: data,
          }).then(response => {
            if(response.ok){
            response.json().then(link=>{
              cb(link);
              resolve(link);
            
            });
          }else{
            reject();
          }
          });
        })
        await toast.promise(UpPromise,{
            loading: 'Uploading...',
            success: 'Uploaded :)',
            error: 'Uploading Failed!!!'
        })
        

      }
  }
  const  ImageChange =async(ev) => {
      await upload(ev,link => {
        setBgImage(link);
      })
  }

  const  AvatarChange =async(ev) => {
    await upload(ev,link => {
      setAvatar(link);
    })
}


  const saveSettings= async(formData) =>{
    console.log(formData.get('displayName'));
    const res = await PageForm(formData);
    if(res){
      toast.success('Saved Succesfully');
    }
  }
  return (

    <div>
    <Box>
    <form action={saveSettings}>
        <div className="py-4 -m-4 min-h-[300px] flex justify-center items-center bg-cover bg-center"
          style={
              bgType === 'color'
                ? {backgroundColor:bgColor}
                : {backgroundImage:`url(${bgImage})`}
            }>
        <div>
        <RadioToggle
                defaultValue={page.bgType}
                options={[
                  {value:'color', icon: faPalette, label: 'Color'},
                  {value:'image', icon: faImage, label: 'Image'},
                ]}
                onChange={val=>setBgType(val)}
              />

              {bgType === 'color' && (
                <div className="bg-gray-200 shadow text-gray-700 p-2 mt-2">
                  <div className="flex gap-2 justify-center">
                    <span>Selected Color:</span>
                    <input
                      type="color"
                      name="bgColor"
                      onChange={ev => setBgColor(ev.target.value)}
                      defaultValue={bgColor} />
                  </div>
                </div>
              )}
              {bgType === 'image' && (
                <div className="flex justify-center">
                  <label
                    className="bg-white shadow px-4 py-2 mt-2 flex gap-2"
                  >
                    <input type="hidden" name="bgImage" value={bgImage}/>
                    <input
                      type="file"
                      onChange={ImageChange}
                      className="hidden"/>
                    <div className="flex gap-2 items-center cursor-pointer">
                      <FontAwesomeIcon
                        icon={faCloudArrowDown}
                        className="text-gray-700" />
                      <span>Change image</span>
                    </div>
                  </label>
                </div>
              )}
            </div>
        </div>
        <div className="flex justify-center -mb-12">
            <div className="relative -top-8 w-[128px] h-[128px]">
              <div className="overflow-hidden h-full rounded-full border-4 border-white shadow shadow-black/50">
                <Image
                  className="w-full h-full object-cover"
                  src={avatar}
                  alt={'avatar'}
                  width={128} height={128} />
              </div>
              <label
                htmlFor="avatarIn"
                className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow shadow-black/50 aspect-square flex items-center cursor-pointer">
                <FontAwesomeIcon width={23} height={23} icon={faCamera} />
              </label>
              <input onChange={AvatarChange} id="avatarIn" type="file" className="hidden"/>
              <input type="hidden" name="avatar" value={avatar}/>
            </div>
          </div>
        <div className="p-0">
            <label className="input-label" htmlFor="nameIn">Display name</label>
            <input
              className="ip-text"
              type="text"
              id="nameIn"
              name="displayName"
              defaultValue={page.displayName}
              placeholder="John Doe"/>
            <label className="input-label" htmlFor="locationIn">Location</label>
            <input
              className="ip-text"
              type="text"
              id="locationIn"
              name="location"
              defaultValue={page.location}
              placeholder="Somewhere in the world"/>
            <label className="input-label" htmlFor="bioIn">Bio</label>
            <textarea
              className="ip-text"
              name="bio"
              defaultValue={page.bio}
              id="bioIn"
              placeholder="Your bio goes here..." />
            <div className="max-w-[200px] mx-auto">
              <SubmitButton>
                <FontAwesomeIcon icon={faSave} />
                <span>Save</span>
              </SubmitButton>
            </div>
          </div>
      </form>
    </Box>
      
    </div>
  );
};

export default PageSettings;

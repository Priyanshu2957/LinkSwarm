'use client'
import React, { useState } from 'react'
import Box from '../layout/Box'
import { faEnvelope, faSave } from '@fortawesome/free-regular-svg-icons'
import { faGripLines, faMobile, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faDiscord, faFacebook, faGithub, faInstagram, faTelegram, faTiktok, faWhatsapp, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SubmitButton from '../buttons/SubmitButton'
import { saveButton } from '@/app/actions/PageForm'
import { ReactSortable } from "react-sortablejs";
const AllButtons =[
      {key: 'email', 'label': 'e-mail', icon: faEnvelope, placeholder: 'test@example.com'},
      {key: 'mobile', 'label': 'mobile', icon: faMobile, placeholder: '+91 XXXXX XXXXX'},
      {key: 'instagram', 'label': 'instagram', icon: faInstagram, placeholder: 'https://instagram.com/profile/...'},
      {key: 'facebook', 'label': 'facebook', icon: faFacebook,placeholder: 'https://facebook.com/profile/...'},
      {key: 'discord', 'label': 'discord', icon: faDiscord},
      {key: 'tiktok', 'label': 'tiktok', icon: faTiktok},
      {key: 'youtube', 'label': 'youtube', icon: faYoutube},
      {key: 'whatsapp', 'label': 'whatsapp', icon: faWhatsapp},
      {key: 'github', 'label': 'github', icon: faGithub},
      {key: 'telegram', 'label': 'telegram', icon: faTelegram},
]
function upperFirst(str) {
  return str.slice(0,1).toUpperCase() + str.slice(1);
}
const ButtonSettings = ({user,page}) => {
    
    const databaseButtonsKeys = Object.keys(page.buttons);
    const databaseButtonsInfo = databaseButtonsKeys.map(k=> AllButtons.find(b => b.key === k))

    const [ActiveButton, setActiveButton] = useState(databaseButtonsInfo);

    const addButton =(button)=>{
        setActiveButton(prvButton =>{
            return [...prvButton,button];
        })
    }
    const saveBtn = async(formData) =>{
      await saveButton(formData);
    }
    const remBtn =({key})=>{
      setActiveButton(prevBtn=>{
        return prevBtn.filter(btn => btn.key !== key)
      })
    }
    const availableButtons = AllButtons.filter(b1 => !ActiveButton.find(b2=> b1.key === b2.key))
  return (
    <Box>
    <form action={saveBtn}>
        <h2 className=' text-2xl font-bold mb-4 '>Your Quick Links</h2>
        <ReactSortable
          handle=".handle"
          list={ActiveButton}
          setList={setActiveButton}>
        {ActiveButton.map(b=>(
            <div key={b.key} className="mb-4 flex items-center  shadow shadow-black/50">
              <div className="w-48 flex h-full text-gray-700 p-2 gap-2 items-center ">
                <FontAwesomeIcon
                  icon={faGripLines}
                  className="cursor-pointer text-gray-400 handle p-2" />
                <FontAwesomeIcon icon={b.icon} />
                <label htmlFor={`fill+${b.label}`}>{upperFirst(b.label)}:</label>
              </div>
              <div className=' flex grow'>
                <input
                  className=' w-full outline-none'
                  placeholder={b.placeholder}
                  name={b.key}
                  id={`fill+${b.label}`}
                  defaultValue={page.buttons[b.key]}
                  type="text" style={{marginBottom:'0'}} />
                <button
                  onClick={() => remBtn(b)}
                  type="button"
                  className="py-3 px-4 hover:bg-red-400 hover:text-white text-red-400 cursor-pointer">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          ))}
        </ReactSortable>
        <div className=' flex flex-wrap gap-2'>
            {availableButtons.map(b=>(
                <button key={b.key} className=' flex items-center gap-2 p-2 bg-gray-200' onClick={()=>addButton(b)}>
                    <FontAwesomeIcon icon={b.icon} />
                    <span className="">
                {upperFirst(b.label)}
              </span>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          ))}
        </div>
        <div className="max-w-xs mx-auto mt-8">
          <SubmitButton>
            <FontAwesomeIcon icon={faSave} />
            <span>Save</span>
          </SubmitButton>
        </div>
        </form>
    </Box>
)
}

export default ButtonSettings
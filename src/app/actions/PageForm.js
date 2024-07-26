'use server'
import mongoose from 'mongoose'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { Page } from '@/models/page';
import {User} from "@/models/User";

const PageForm = async(formData) => {
    mongoose.connect(process.env.MONGO_URI);
    const session = await getServerSession(authOptions);
    if(session){
        const keys = ['displayName','location','bio','bgType','bgColor','bgImage'];
        const dataUpdate={};
        for ( const key of keys){
            if(formData.has(key)){
                dataUpdate[key]=formData.get(key);
            }
        }

        await Page.updateOne({owner:session?.user?.email}, dataUpdate);
        if (formData.has('avatar')) {
            const avatarLink = formData.get('avatar');
            await User.updateOne(
              {email: session.user?.email},
              {image: avatarLink},
            );
        }
        return true;
    }
    return false;

}
export const saveButton = async(formData) =>{
    mongoose.connect(process.env.MONGO_URI);
    const session = await getServerSession(authOptions);
    const buttonInfo = {};
    formData.forEach((value,key)=>{
        buttonInfo[key] = value;
    })
    const dataUpdate ={buttons:buttonInfo}
    if(session){
        await Page.updateOne({owner:session?.user?.email}, dataUpdate);
        return true;
    }
    return false;
}

export async function savePageLinks(links) {
    mongoose.connect(process.env.MONGO_URI);
    const session = await getServerSession(authOptions);
    if (session) {
      await Page.updateOne(
        {owner:session?.user?.email},
        {links},
      );
    } else {
      return false;
    }
  }

export default PageForm
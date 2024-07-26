'use server'
import { Page } from '@/models/Page'
import mongoose from 'mongoose'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react' 
import { authOptions } from '../api/auth/[...nextauth]/route'
const handleFormSubmit = async(formData) => {
    const username = formData.get('username')
    mongoose.connect(process.env.MONGO_URI)
    console.log(username)
    const pageDoc= await Page.findOne({uri:username})
    if(pageDoc){
        return false;
    }
    else{
        const session = await getServerSession(authOptions);
        const email = session.user.email;
        console.log(email)
        return await Page.create({uri:username,owner:email,});
        
    }
}

export default handleFormSubmit

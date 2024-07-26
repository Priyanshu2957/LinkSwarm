import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import handleFormSubmit from '../../actions/handleFormSubmit';
import UsernameForm from '@/components/form/UsernameForm';
import { Page } from '@/models/Page';
import mongoose from 'mongoose';
import PageSettings from '@/components/form/PageSettings';
import ButtonSettings from '@/components/form/ButtonSettings';
import CustomLinks from '@/components/form/CustomLinks';

const AccountPage = async({searchParams}) => {
    const session = await getServerSession(authOptions);
    const desiredUsername = searchParams?.desiredUsername;
    mongoose.connect(process.env.MONGO_URI)
    
    if (!session){
        redirect('/');
    }
    const page = await Page.findOne({owner: session?.user?.email});
    if (page){
      return(
        <div>
          <PageSettings  page={page} user={session.user}/>
          <ButtonSettings  page={page} user={session.user} />
          <CustomLinks  page={page} user={session.user} />
        </div>
        
      )
    }
  return (
    <div>
      <UsernameForm desiredUsername={desiredUsername} />
    </div>
  )
}

export default AccountPage
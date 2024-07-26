/* eslint-disable react/no-unescaped-entities */
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Chart from '@/components/chart'
import Box from '@/components/layout/Box'
import { Event } from '@/models/Event'
import { Page } from '@/models/Page'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isToday } from 'date-fns'
import mongoose from 'mongoose'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import React from 'react'

const Analytics = async() => {
  mongoose.connect(process.env.MONGO_URI);
  const session = await getServerSession(authOptions);
  if(!session){redirect('/')}
  const page = await Page.findOne({owner:session.user.email})
  const totalViews = await Event.aggregate([
    {$match:{
      type :'view',
      uri:'test1'
      },
    },
    {
      $group :{
        _id:{
          $dateToString:{
            date: "$createdAt",
            format: "%Y-%m-%d",
          },
        },
        count:{
          "$count":{},
        }
      },
    },
    {
      $sort:{_id:1}
    }
  ]);

  const clicks = await Event.find({
    page: page.uri,
    type: 'click',
  });

  
  return (
    <div>
      <Box>
      <h2 className="text-xl mb-6 text-center font-bold text-sky-500">Total Visits</h2>
        <Chart data={totalViews.map(o => ({
          'date': o._id,
          'visits': o.count,
        }))} />
      </Box>
      <Box>
        <h2 className="text-xl mb-6 text-center">Clicks</h2>
        {page.links.map(link => (
          <div key={link.title} className="md:flex gap-4 items-center border-t border-gray-200 py-4">
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
            <div className="grow">
              <h3>{link.title || 'no title'}</h3>
              <a className="text-xs text-blue-400" target="_blank" href="link.url">{link.url}</a>
            </div>
            <div className="text-center">
              <div className="border rounded-md p-2 mt-1 md:mt-0">
                <div className="text-3xl">
                  {
                    clicks
                      .filter(
                        c => c.uri === link.url
                          && isToday(c.createdAt)
                      )
                      .length
                  }
                </div>
                <div className="text-gray-400 text-xs uppercase font-bold">today's clicks</div>
              </div>
            </div>
            <div className="text-center">
              <div className="border rounded-md p-2 mt-1 md:mt-0">
                <div className="text-3xl">
                  {clicks.filter(c => c.uri === link.url).length}
                </div>
                <div className="text-gray-400 text-xs uppercase font-bold">total clicks </div>
              </div>
            </div>
          </div>
        ))}
      </Box>
    </div>
  )
}

export default Analytics
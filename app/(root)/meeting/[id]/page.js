"use client"

import Loader from '@/components/Loader'
import MeetingRoom from '@/components/MeetingRoom'
import MeetingSetup from '@/components/MeetingSetup'
import useGetCallById from '@/hooks/useGetCallById'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

const MeetingPage = () => {
    const {id} = useParams()
   const {user,isLoaded} =  useUser()
   const [isSetUpCompleted, setIsSetUpCompleted] = useState(false)
   const {call , isCallLoading} = useGetCallById(id)

   if( !isLoaded || isCallLoading) return <Loader/>
  return (
    <div className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {
            !isSetUpCompleted ?  (<><MeetingSetup setIsSetupComplete={setIsSetUpCompleted}/></>) : (<><MeetingRoom/></>)
          }
        </StreamTheme>
      </StreamCall>
    </div>
  )
}

export default MeetingPage
import memberIcon from '../../assets/member.png'

import { useState } from 'react'
export default function Member() {

    
    return (
        <img 
            className=" cursor-pointer ml-[42px] h-full group-hover:bg-[url('../../../src/assets/member-hover.png')]"
            src={memberIcon}

            />
    )
}
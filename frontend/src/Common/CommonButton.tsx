import { Button } from '@mui/material'
import React, { FC } from 'react'

interface commonButton{
    type?:"submit" | "button" | "reset",
    onClick?:()=>void,
    sx?:object,
    variant?:"contained" | "outlined" | "text",
    disabled?:boolean,
    color?:"success" | "secondary" | "error",
    size?:"small" | "medium" | "large",
    title?:React.ReactNode,
    startIcon?:any
    
    // children
    children?:string
}


const CommonButton:FC <commonButton> = ({type,onClick,sx,variant,disabled,color,size,title,startIcon,}) => {
  return (
    <Button type={type} variant={variant} onClick={onClick} sx={sx} disabled={disabled} color={color} size={size} startIcon={startIcon} >
        {title}
    </Button>
  )
}

export default CommonButton
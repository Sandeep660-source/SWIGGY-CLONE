import React from 'react'
import MenuCard from './Menucard'
import './Menu.css' 

const MenuItems = ({menuItems}) => {
    console.log(menuItems)
    
  return (
    <>
   <div className="menu-grid">
  {menuItems.map((item, index) => (
    <MenuCard key={index} menuItem={item} />
  ))}
</div>

    </>
  )
}

export default MenuItems
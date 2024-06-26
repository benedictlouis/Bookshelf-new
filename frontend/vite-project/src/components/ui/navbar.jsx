import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Menubar,
    MenubarMenu,
    MenubarTrigger,
    MenubarContent,
    MenubarItem,
    MenubarSeparator,
} from "@/components/ui/menubar";

const Navbar = () => {
    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/home');
    };

    const handleBookCollection = () => {
        navigate('/book_collection');
    };

    const handleViewProfile = () => {
        navigate('/profile');
    };

    return (
        <div className="bg-indigo-950 p-2 w-full fixed top-0 left-0 z-50 flex items-center justify-between">
            <div className="text-lg font-bold text-white ml-4">Bookshelf</div>
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger className="text-black" onClick={handleHome}>Home</MenubarTrigger>
                </MenubarMenu>
                <MenubarMenu>
                    <MenubarTrigger className="text-black" onClick={handleBookCollection}>Collection</MenubarTrigger>
                </MenubarMenu>
            </Menubar>
        </div>
    );
};

export default Navbar;

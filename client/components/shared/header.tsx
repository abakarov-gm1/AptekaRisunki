import React from 'react';
import {Aperture, User} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";

const Header = () => {
    return (

        <div className='ml-10 mr-20 mb-20 mt-5 flex justify-around'>

            <div className='text-3xl'>
                Logo
            </div>

            <div>
                <Button asChild>
                    <Link href=""><User /> <p className='ml-2'>Войти</p> </Link>
                </Button>
            </div>
        </div>

    );
};

export default Header;
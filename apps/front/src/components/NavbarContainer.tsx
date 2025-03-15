
import React from 'react'
import { PropsWithChildren } from 'react'
import DesktopNavbar from './destopNavbar'
import MobileNavbar from './mobileNavbar';

type Props = PropsWithChildren;
export default function NavbarContainer(props: Props) {
    return (
        <div className='relative'>
            <DesktopNavbar>{props.children}</DesktopNavbar>
            <MobileNavbar>{props.children}</MobileNavbar>
        </div>
    )
}

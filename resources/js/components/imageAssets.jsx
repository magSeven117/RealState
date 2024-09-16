import React from 'react';
import banner01 from "../assets/images/banner-01.jpg"
import banner02 from "../assets/images/banner-02.jpg"
import banner03 from "../assets/images/banner-03.jpg"
import featureIcon from "../assets/images/featured-icon.png"
import feature from "../assets/images/featured.jpg"
import infoIcon01 from "../assets/images/info-icon-01.png"
import infoIcon02 from "../assets/images/info-icon-02.png"
import infoIcon03 from "../assets/images/info-icon-03.png"
import infoIcon04 from "../assets/images/info-icon-04.png"
import videoFrame from "../assets/images/video-frame.jpg"
import deal01 from "../assets/images/deal-01.jpg"
import deal02 from "../assets/images/deal-02.jpg"
import deal03 from "../assets/images/deal-03.jpg"
import heading from "../assets/images/page-heading-bg.jpg"
import houseSingle from "../assets/images/single-property.jpg"
import house01 from "../assets/images/property-01.jpg"
import house02 from "../assets/images/property-02.jpg"
import house03 from "../assets/images/property-03.jpg"
import house04 from "../assets/images/property-04.jpg"
import house05 from "../assets/images/property-05.jpg"
import house06 from "../assets/images/property-06.jpg"
import phoneIcon from "../assets/images/phone-icon.png"
import emailIcon from "../assets/images/email-icon.png"
import sizeIcon from "../assets/images/info-icon-01.png"
import room from "../assets/images/room.png"
import bathroom from "../assets/images/bathroom.png"


function FilterButton() {
    return (
        <svg viewBox="0 0 512 512" height="1em">
            <path
                d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z"
            ></path>
        </svg>

    )
}

function CancelButton({ style, onClick }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6" style={style} onClick={onClick}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    )
}

function DollarIcon({color = "#f55525ed", height = "40px", width = "40px" }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height={height} width={width}>
            <path fill={color} d="M160 0c17.7 0 32 14.3 32 32l0 35.7c1.6 .2 3.1 .4 4.7 .7c.4 .1 .7 .1 1.1 .2l48 8.8c17.4 3.2 28.9 19.9 25.7 37.2s-19.9 28.9-37.2 25.7l-47.5-8.7c-31.3-4.6-58.9-1.5-78.3 6.2s-27.2 18.3-29 28.1c-2 10.7-.5 16.7 1.2 20.4c1.8 3.9 5.5 8.3 12.8 13.2c16.3 10.7 41.3 17.7 73.7 26.3l2.9 .8c28.6 7.6 63.6 16.8 89.6 33.8c14.2 9.3 27.6 21.9 35.9 39.5c8.5 17.9 10.3 37.9 6.4 59.2c-6.9 38-33.1 63.4-65.6 76.7c-13.7 5.6-28.6 9.2-44.4 11l0 33.4c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-34.9c-.4-.1-.9-.1-1.3-.2l-.2 0s0 0 0 0c-24.4-3.8-64.5-14.3-91.5-26.3c-16.1-7.2-23.4-26.1-16.2-42.2s26.1-23.4 42.2-16.2c20.9 9.3 55.3 18.5 75.2 21.6c31.9 4.7 58.2 2 76-5.3c16.9-6.9 24.6-16.9 26.8-28.9c1.9-10.6 .4-16.7-1.3-20.4c-1.9-4-5.6-8.4-13-13.3c-16.4-10.7-41.5-17.7-74-26.3l-2.8-.7s0 0 0 0C119.4 279.3 84.4 270 58.4 253c-14.2-9.3-27.5-22-35.8-39.6c-8.4-17.9-10.1-37.9-6.1-59.2C23.7 116 52.3 91.2 84.8 78.3c13.3-5.3 27.9-8.9 43.2-11L128 32c0-17.7 14.3-32 32-32z"/>
        </svg>
    )
}

function TrashIcon({ style, handleClearFilter}) {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#f35525" viewBox="0 0 448 512" strokeWidth="1.5" stroke="currentColor" className="size-6" style={style} onClick={handleClearFilter}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
            </svg>
        </>
    )
}

export {
    banner01,
    banner02,
    banner03,
    featureIcon,
    feature,
    infoIcon01,
    infoIcon02,
    infoIcon03,
    infoIcon04,
    videoFrame,
    deal01,
    deal02,
    deal03,
    heading,
    house01,
    house02,
    house03,
    house04,
    house05,
    house06,
    FilterButton,
    CancelButton,
    emailIcon,
    phoneIcon,
    houseSingle,
    bathroom,
    sizeIcon,
    DollarIcon,
    room,
    TrashIcon,
};
import { emailIcon, phoneIcon } from "../ImageAssets";
import React from 'react';

export function InfoContact ({ wrap = false }) {
    const style = wrap ? {
        display:"flex",
        flexDirection:"column",
        gap:"10px",
    } : {};

    return (
        <div className="row" style={style}>
            <div className="col-lg-6">
                <div className="item phone">
                    <img src={phoneIcon} alt="Phone Icon" style={{ maxWidth: '40px' }} />
                    <h6>
                        010-020-0340
                        <br />
                        <span>Phone Number</span>
                    </h6>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="item email">
                    <img src={emailIcon} alt="Email Icon" style={{ maxWidth: '40px' }} />
                    <h6>
                        nd10salom@gmail.com
                        <br />
                        <span>Business Email</span>
                    </h6>
                </div>
            </div>
        </div>
    )
}
import React, { useEffect, useContext } from 'react';
import { SocketContext } from '../Context';
import { Buffer } from 'buffer';
// global.Buffer = require('buffer').Buffer;
// import buffer from 'Buffer';
// global.Buffer = buffer.Buffer;
const ImageDisplay = () => {
    const { logo, getLogo } = useContext(SocketContext);
    useEffect(() => {
        getLogo();
    }, []);

    return (
        <>
            {/* {image ? (
                <img
                    src={`data:${image.mimetype};base64,${Buffer.from(image.image_data).toString('base64')}`}
                    alt="Fetched Image" style={{ marginTop: 5, paddingRight: 5, height: 40, width: 40 }}
                />
            ) : (
                <p>Loading image...</p>
            )} */}
            {logo ? (
                <img
                    src={`data:${logo.mimetype};base64,${Buffer.from(logo.image_data).toString('base64')}`} alt='icon'
                    style={{ marginTop: 5, paddingRight: 5, height: 40, width: 40 }}
                />
            ) : (
                <p>Loading image...</p>
            )}
        </>
    );
};

export default ImageDisplay;

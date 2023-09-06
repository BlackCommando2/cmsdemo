import React, { useState, useContext } from "react";
import { SocketContext } from "../../Context";
import Button from "@mui/material/Button";

const ImageSelector = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const { logo, setLogo, updateLogo } = useContext(SocketContext);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            console.log("imageUrl: " + imageUrl);
            setLogo(imageUrl);
            localStorage.setItem('logo', imageUrl);
            updateLogo(imageUrl);
        }
    };

    return (
        <div>
            <input
                type="file"
                accept=".png, .jpg, .jpeg, .gif"
                onChange={handleFileChange}
                style={{ display: "none" }}
                id="logo-upload-input"
            />
            <label htmlFor="logo-upload-input">
                <Button component="span" variant="contained" color="primary" sx={{ marginLeft: 3 }}>
                    Upload New Logo
                </Button>
            </label>
            {selectedFile && <p>Selected file: {selectedFile.name}</p>}
        </div>
    );
};

export default ImageSelector;

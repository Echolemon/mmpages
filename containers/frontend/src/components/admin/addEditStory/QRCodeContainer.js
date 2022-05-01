import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Container,
    CardContent,
    CardActions,
    CardHeader,
    Grid,
    Card,
    Divider,
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@material-ui/core';
import QRCode from "qrcode.react";

export default function QRCodeContainer(props) {
    const DEPLOY_URL = props.resourceType == 'Flowers' ? "https://mezzuzotproject.com/flowerStory/" : "https://mezzuzotproject.com/missingMezzuzot/"
    const downloadQR = () => {
        const canvas = document.getElementById("qrcode");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qrcode.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <Box sx={{ py: 2 }}>
            <Card>
                <CardHeader title="QR Code" />
                <CardContent >
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                        }}
                    >
                        <QRCode
                            id="qrcode"
                            value={DEPLOY_URL + props.story.id}
                            size={170}
                            level={"H"}
                        />
                    </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Button
                        color="primary"
                        fullWidth
                        variant="text"
                        onClick={downloadQR}
                    >
                        Download QR Code
                    </Button>
                </CardActions>
            </Card>
        </Box>
    )
}
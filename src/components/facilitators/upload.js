import React, { useState } from "react";
import '../css/facilitator.css'
import FileUp from '../hooks/fileup.js'

export function Upload() {
    return (
        <UploadContent />)
}

export function UploadContent() {
    return (
        <div>
            <br></br><br></br><br></br><br></br><br></br><br></br>
            <FileUp/>
        </div>
    )
}

export default Upload;
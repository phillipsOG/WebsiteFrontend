import React from 'react'
import axios from 'axios';

class FileUp extends React.Component{

    constructor(){
        super();
        this.state = {
            selectedFiles: '',
            message: '',
            success: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            selectedFiles: event.target.files,
          })
    }

    submit(){
        const data = new FormData() 
        const  url = "https://lumidev.ddns.net/components/hooks/upload.php";
        let files = this.state.selectedFiles;

        // Don't POST if we have no files to upload
        if (files.length <= 0) {
            this.setState({message: 'Please select a file'});
            return;
        }
        
        for (let i = 0; i < files.length; i++) {
            data.append(`file_${i}`, files[i]);
        }
    
        axios.post(url, data, {timeout: 9000000}, { // receive two parameter endpoint url ,form data 
        })
        .then(res => { // then print response status
            this.setState({succes:  res.data.success === true});

            if (res.data.message !== 'undefined') {
                this.setState({
                    message: res.data.message
                });
            }
        })

    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <br /><br />
                            <h3 className="text-black">Lumi File Uploader</h3>
                            {/* TODO: Change this to a css class based on the success state  */}
                            <span style={{color: "green"}} >{this.state.message}</span>
                            <br />
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label className="text-black">Select File:</label>
                                    <input type="hidden" name="MAX_FILE_SIZE" value="90000000" /> 
                                    <input type="file" className="form-control" name="file[]" id="file" multiple onChange={this.handleInputChange} />
                                </div>
                            </div>
                            <br></br>
                            <div className="form-row">
                                <div className="col-md-6">
                                    <button type="submit" className="btn btn-dark" onClick={()=>this.submit()}>Upload File</button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        )  
    }
}

export default FileUp;
import axios from 'axios';     //for http requests
import {useState, useEffect} from 'react'
import {CsvToHtmlTable} from 'react-csv-to-table';
// import 'components_style.css';

// import csv from "csv-parser"
// import * as fs from 'fs'


// const axios_instance = axios.create({
//     baseURL:"http://localhost:8888"
// })

const axios_instance = axios.create({
    baseURL : "https://affinity-webapp-back-end.herokuapp.com"
})


export default function FileOperations(){
    const [fileList, setFileList] = useState([]);
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [csv_file,setCSVfile] = useState('');

    useEffect(
        ()=>{ getFileList()},[]);

    async function getFileList(e){
        let fetched_data = await axios_instance.get('/files')
                        .then(res => setFileList(res.data));
        console.log("file_list",fetched_data)
        return fetched_data;
    }
    console.log("filelist" ,fileList)


    async function getFile(file){
        file.preventDefault();

        let file_name = document.getElementById("file-names").value;
        if(file_name === ""){
            alert("Please Select a file! to view the data")
        }
        else{

            
            let fetched_file = await axios_instance.get(`/files/${file_name}`)
            .then(res=> res)
            console.log("Fetched_File",typeof(fetched_file.data));//.split('\n'));
            setCSVfile(fetched_file.data);
            let csv_rows = fetched_file.data.split('\n');
            
            console.log("CSV_ROWS", csv_rows)
            let csv_elements = csv_rows[0].split(",")
            console.log(csv_elements);
            
            
            console.log("file_name", file_name);
            // document.getElementById("demo").innerHTML = x;
             }
            
        }


        async function deleteFile(file){
        file.preventDefault();

        let file_name = document.getElementById("file-names").value;
        if(file_name === ""){
            alert("Please Select a file! to delete")
        }
        else{

            
            let fetched_file = await axios_instance.delete(`/files/${file_name}`)
            .then(res=> alert(`${res.data} \n Refresh the page to reflect the result`))
            // console.log("Fetched_File",typeof(fetched_file.data));//.split('\n'));
            // setCSVfile(fetched_file.data);
            // let csv_rows = fetched_file.data.split('\n');
            
            // console.log("CSV_ROWS", csv_rows)
            // let csv_elements = csv_rows[0].split(",")
            // console.log(csv_elements);
            
            
            // console.log("file_name", file_name);
            // document.getElementById("demo").innerHTML = x;
        }
            
        }
        
        // CSV-Parsing
        


        // const results =[];
      
        // const csv_parser = (filepath) => {
        //     fs.createReadStream(filepath)
        //     .pipe(csv())
        //     .on('data', (data) => results.push(data))
        //     .on('end', () => {
            
        //     // const data = results.map(x=>JSON.stringify(x)).join('\n');

        //     console.log(results);
        //     // return results;
        //     });}



    //onChange function
    const onChange = e => {

        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name);

        console.log("setfile name : ", setFile);
        
      };

    //onSubmit function

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        console.log("file before assig:",file)

        // formData.append()
        formData.append('file', file)
    
    
        axios_instance({
            url: '/upload-file',
            method: "POST",
            data: formData
        })

        alert(`File : ${file.name} uploaded successfully \n Refresh the page to view in the list`)
    }




    return(
        <>
        <div className="file-operations-container">

            <form className ="file-upload" onSubmit={onSubmit}>
                
                <input type="file" id="file-upload-box" name="file-upload" onChange = {onChange} />
                <input type="submit" value="upload your file to server"></input>
               
            </form>

            <form className ="file-operation">
                <select id = "file-names" name = "file-names" >
                    <option value="">server  file list</option>
                    
                    {fileList.map(file => <option id={file.name} value={file.name}>{file.name}</option>)}
                </select>
                
                <button  onClick={getFile} name="get-file">get file</button>
                <button  onClick={deleteFile} name="delete-file">delete file</button>

            </form>

            </div>
            
            <h3>select a file from 'server file list' to view csv content</h3>
            <div className="temp-table">

            {/* Temporary view until container view issue is solved */}
            <CsvToHtmlTable class="temp-table-solution"
            data={csv_file} csvDelimiter="," />
            </div>
        </>
    );
};


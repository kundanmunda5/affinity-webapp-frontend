import FileOperations from "./FileOperations";
// import FileFields from "./FileFields";           [couldn't implement this until container is resolved]


export default function FileController(){
    return(
        <div className="controller-container">
            <FileOperations />      
            {/* <FileFields />              [couldn't implement this until container is resolved] */}

        </div>
    );
};
import DataUriParser from "datauri/parser.js"
import path from "path"

export const getDataUri=(file)=>{

    const parser=new DataUriParser();
    // console.log("2");
    const extName=path.extname(file.originalname).toString();
    // console.log(extName);
    return  parser.format(extName,file.buffer);
}

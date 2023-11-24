import fs from "fs";
import path from "path";

export default defineEventHandler(async (event) => {
  const files =  await  readMultipartFormData(event)
  if(!files) {return createError({statusCode: 400, data: 'Invalid files.'})}
  
  const uploadedFilePaths:string[] = []

  files.forEach((file) => {
    const filePath = path.join(process.cwd(), 'public', file.filename as string);
    fs.writeFileSync(filePath, file.data);
    uploadedFilePaths.push(file.filename as string)
  })
  console.log(uploadedFilePaths)
  return uploadedFilePaths
})

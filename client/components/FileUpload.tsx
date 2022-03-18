import React, { useRef } from 'react'

interface FileUploadProps {
  setFile: Function
  accept: string
}

const FileUpload: React.FC<FileUploadProps> = ({
  setFile,
  accept,
  children,
}) => {
  const ref: any = useRef()

  const onChange = (e: any) => {
    setFile(e.target.files[0])
  }

  return (
    <div onClick={() => ref.current.click()}>
      <input
        type="file"
        accept={accept}
        style={{ display: 'none' }}
        ref={ref}
        onChange={onChange}
      />
      {children}
    </div>
  )
}

export default FileUpload

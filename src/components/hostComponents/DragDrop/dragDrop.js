import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unit } from "../../../store/actions/unit";
import './dragDrop.css'
const DragDrop = () => {


    let unite = useSelector(state => state.unit)
    const dispatch = useDispatch()
    // drag state
    const [dragActive, setDragActive] = React.useState(false);
    const [imgs, setImgs] = useState(unite.images)
    const inputRef = React.useRef(null);

    // handle drag events
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {

        }
    }

    // triggers when file is selected with click
    const handleChange = async function (e) {
        e.preventDefault();

        const data = new FormData();

        data.append("file", e.target.files[0]);
        data.append("upload_preset", "galleryApp");
        data.append("cloud_name", "dnbx27xwk");
        try {
            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/dnbx27xwk/image/upload",
                data
            );
            console.log(`${res.data["secure_url"]}`)

            setImgs([...imgs, `${res.data["secure_url"]}`])
            console.log(imgs);
        } catch (err) {
            console.log(err);
        }
    };



    const onButtonClick = (e) => {
        e.preventDefault()
        inputRef.current.click();
        console.log(inputRef.current.files);

    };

    function deleteImg(e, src) {
        let filteredImgs = imgs.filter(img => {
            if (img !== src) {
                console.log(src);
                return img
            }

        })
        setImgs(filteredImgs)
    }

    useEffect(() => {


        dispatch(unit({ images: imgs }))
        console.log(unite);

    }, [imgs]);


    return (
        <div>
            <div className=' mt-3  mb-5 p3 pb-4  d-flex justify-content-center '>
                <div className=' ' style={{ maxWidth: '700px' }}>


                    <div className='my-4  p-3 '  >
                        <div className="mb-5">
                            <h2 className='' style={{ maxWidth: '550px' }}>Add some photos of your property</h2>
                            <p className="text-secondary" style={{ fontSize: '18px' }}>You'll need 5 photos to get started. You can add more or make changes later.</p>
                        </div>
                        <div className=' row' >
                            <form id="form-file-upload" enctype="multipart/form-data">
                                <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} accept="image/jpeg, image/jpg, image/png" name="uploaded_file" />
                                <label id="label-file-upload" htmlFor="input-file-upload">
                                    <div>
                                        <h5>Drag your photos here</h5>
                                        <p>Choose at least 5 photos</p>
                                        <button className="upload-button" onClick={onButtonClick}>Upload from your devic</button>
                                    </div>
                                </label>
                                {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}

                            </form>
                        </div >
                    </div>

                    <div className="d-flex row mt-5 px-3">

                        {/* <div> */}

                        {imgs.map((img, index) => {
                            // let src = URL.createObjectURL(img)
                            return <div style={{ width: 'fit-content', }}>
                                <button className="d-block ms-5 mx-4 pe-0  text-white bg-danger border border-secondary rounded-circle" style={{ fontWeight: 'bold', width: "30px", height: '30px' }} onClick={(e) => { deleteImg(e, img) }}>x</button>
                                <img src={img} key={index} className="rounded-0" style={{ width: '100px', height: "100px" }} alt="pic" />
                            </div>
                        })}
                        {/* </div> */}
                    </div>
                </div>


            </div>

        </div>
    );
};

export default DragDrop;
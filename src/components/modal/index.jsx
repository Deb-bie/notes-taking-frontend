import {MdClose} from "react-icons/md"


const Modal = ({handleClose, title, details, titleChange, detailChange, addNote, updateNote, type, row}) => {
    let data;

    switch (type) {
        case "add":
            data = {
                title: "Add a new note",
                button: "Add"
            }
        break;
    
        case "update":
            data = {
                title: "Update Note",
                button: "Update"
            };
        break;
        
        case "view":
            data = {
                title: "View details",
            }      
        break;
        
        default:
        break;
    }




    
    return (
        <div className="w-[100%] h-[100%] flex justify-center items-center fixed inset-0 z-50 outline-none focus:outline-none overflow-auto bg-[#00000059] ">
            <div className="relative 4xs:w-[90%] sm:w-[60%] h-[80%] top-[30px]  my-2 4xs:mx-2 sm:mx-12 flex  overflow-scroll bg-white pb-[10px] shadow-lg ">
                <div className="border-0 relative flex flex-col w-full h-[100%] outline-none focus:outline-none rounded-[10px]">
                    <div className="w-[100%] h-full flex flex-col justify-start ">
                        <div className="w-[100%] flex flex-row justify-end ">
                            <div className=" h-auto 4xs:mr-[10px] sm:mr-[30px] mt-[10px] p-2 rounded-[50%] text-3xl bg-gray-300 " >
                                <MdClose onClick={()=> handleClose()} className="cursor-pointer" />
                            </div>
                        </div>

                        <div className="w-[100%] h-[100%] 4xs:pl-4 sm:pl-32 flex flex-col justify-start p-4 " >
                            <h1 className="w-[100%] text-3xl font-semibold 4xs:mb-2 sm:mb-6 flex ">{data.title}</h1>

                            <div className="w-[100%] h-[100%] flex flex-col   ">
                                <form className="4xs: w-[100%] sm:w-[80%] h-[100%] flex flex-col items-start content-center  ">

                                {
                                    row ? 
                                        <>
                                            {
                                                type === 'view' ? 
                                                    <>
                                                        <label className="text-2xl pb-4 ">Title</label>
                                                        <input 
                                                            type="text" 
                                                            value={row.title}
                                                            readOnly
                                                            className="w-[80%] h-[auto] px-4 py-2 rounded-[10px] border-[1px] mb-6 outline-none "
                                                            
                                                        />
            
                                                        <label className="text-2xl pb-4 ">Details</label>
                                                        <textarea 
                                                            rows="4" 
                                                            value={row.details}
                                                            readOnly
                                                            className="w-[80%] p-4 mb-12  border-[1px] outline-none rounded-[10px] ">
                                                        </textarea>
                                                    </>
                                                :  ""
                                                }

                                                {
                                                    type ==='update' ?


                                                    <>
                                                        <label className="text-2xl pb-4 ">Title</label>
                                                        <input 
                                                            type="text" 
                                                            value={title}
                                                            name="title"
                                                            onChange={titleChange}
                                                            required
                                                            placeholder={row.title}
                                                            className="w-[80%] h-[auto] px-4 py-2 rounded-[10px] border-[1px] mb-6 outline-none "
                                                        />
            
                                                        <label className="text-2xl pb-4 ">Details</label>
                                                        <textarea 
                                                            rows="4" 
                                                            value={details}
                                                            placeholder={row.details}
                                                            name="details"
                                                            onChange={detailChange}
                                                            className="w-[80%] p-4  border-[1px] outline-none rounded-[10px] ">
                                                        </textarea>
            
                                                        <div className="w-[100%] h-[100%] mt-6 flex flex-row justifu-center">
                                                            <button type="submit" onClick={() => updateNote(row._id)} className="w-[80%]  bg-black text-white px-4 py-4 mt-12 rounded-[10px] ">
                                                                {data.button}
                                                            </button>
                                                        </div>
                                                    </>
                                                : ""
                                            }
                                        </>
                                    :
                                        <>            
                                            <label className="text-2xl pb-4 ">Title</label>
                                            <input 
                                                type="text" 
                                                value={title}
                                                name="title"
                                                onChange={titleChange}
                                                required
                                                placeholder="eg. Swimming lessons "
                                                className="w-[90%] h-[auto] px-4 py-2 rounded-[10px] border-[1px] mb-6 outline-none "
                                            />

                                            <label className="text-2xl pb-4 ">Details</label>
                                            <textarea 
                                                rows="4" 
                                                value={details}
                                                name="details"
                                                onChange={detailChange}
                                                className="w-[90%] p-4  border-[1px] outline-none rounded-[10px] ">
                                            </textarea>

                                            {
                                                data.button ? 
                                                    <div className="w-[100%]  mt-6 flex flex-row justifu-center">
                                                        <button type="submit" onClick={addNote} className="w-[90%]  bg-black text-white px-4 py-4 mt-12 rounded-[10px] ">
                                                            {data.button}
                                                        </button>
                                                    </div>
                                                : ""
                                            } 
                                        </>
                                }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
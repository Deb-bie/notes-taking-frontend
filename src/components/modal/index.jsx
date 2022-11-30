import {MdClose} from "react-icons/md"


const Modal = ({handleAddModal, addNote, title, details, titleChange, detailChange}) => {
    
    return (
        <div className="w-[100%] flex justify-center items-center fixed inset-0 z-50 outline-none focus:outline-none overflow-auto bg-[#00000059] ">
            <div className="relative 4xs:w-[90%] sm:w-[60%] 4xs:h-[100vh] sm:h-[100%] top-[30px]  my-2 4xs:mx-2 sm:mx-12 ">
                <div className="border-0 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none rounded-[10px]">
                    <div className="w-[100%] h-full flex flex-col ">
                        <div className="w-[100%] flex flex-row justify-end ">
                            <div className=" h-auto mr-[30px] mt-[10px] p-2 rounded-[50%] text-3xl bg-gray-300 " >
                                <MdClose onClick={()=> handleAddModal()} className="cursor-pointer" />
                            </div>
                        </div>

                        <div className="w-[100%] h-[100%] 4xs:pl-4 sm:pl-32 flex flex-col justify-center p-4 " >
                            <h1 className="w-[100%] h-[100%] text-3xl font-semibold mb-6 flex ">Add a new note</h1>

                            <div className="w-[100%] h-[100%] flex flex-col   ">
                                <form className="4xs: w-[100%] sm:w-[80%] h-[100%] flex flex-col items-start content-center  ">
                                    
                                    <label className="text-2xl pb-4 ">Title</label>
                                    <input 
                                        type="text" 
                                        value={title}
                                        name="title"
                                        onChange={titleChange}
                                        required
                                        placeholder="eg. Swimming lessons "
                                        className="w-[80%] h-[auto] px-4 py-2 rounded-[10px] border-[1px] mb-6 outline-none "
                                    />

                                    <label className="text-2xl pb-4 ">Details</label>
                                    <textarea 
                                        rows="4" 
                                        value={details}
                                        name="details"
                                        onChange={detailChange}
                                        className="w-[80%] p-4  border-[1px] outline-none rounded-[10px] ">
                                    </textarea>

                                    <div className="w-[100%] h-[100%] mt-6 flex flex-row justifu-center">
                                        <button type="submit" onClick={addNote} className="w-[80%]  bg-black text-white px-4 py-4 mt-12 rounded-[10px] ">
                                            Add
                                        </button>
                                    </div>
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
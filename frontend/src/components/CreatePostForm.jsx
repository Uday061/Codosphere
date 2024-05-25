import React, { useState } from 'react';

const CreatePostForm = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    
    return (
        <div className="flex justify-center items-center ">
            <div 
                onClick={openModal} 
                className="bg-gray-100 text-gray-500 px-4 py-2 rounded-xl w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 cursor-pointer text-center border border-black-500 shadow-lg"
            >
                What's on your mind?
            </div>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 p-6 rounded shadow-lg">
                        <div className="heading text-center font-bold text-2xl m-5 text-gray-800">New Post</div>
                        <div className="editor mx-auto w-full flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg">
                            <textarea className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" spellCheck="false" placeholder="Describe everything about this post here"></textarea>
                            <div className="icons flex text-gray-500 m-2">
                                <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                                <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
                            </div>
                            <div className="buttons flex">
                                <div onClick={closeModal} className="btn border border-gray-300 p-1 px-4 font-semibold cursor-pointer text-gray-500 ml-auto">Cancel</div>
                                <div onClick={closeModal} className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Post</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreatePostForm;

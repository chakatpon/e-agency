import React, { useEffect, useState } from 'react'
import Select from "react-select";
import { Accordion } from 'semantic-ui-react'
import Modal from 'react-modal';
import * as style from 'semantic-ui-css';
import Example from "./HelpFormV2";

function HelpForm() {
    useEffect(() => {

        return () => {

        };
    }, []);

   
    var subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            minWidth: "400px",
            maxWidth: "600px"
        }
    };
    Modal.setAppElement('body');



    return (
        <form className="Help-form" >
            <h1 className="title">{"ช่วยเหลือ / FAQ"}</h1>
      
<Example/>
            {/* <div className="list-item" >
                <a className="item" href="#" onClick={openModal}>{"FAQ"}</a>
                <div>
                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >

                        <h2 ref={_subtitle => (subtitle = _subtitle)}>ข่าวเด่น 1</h2>
                        <form className="modal-form">
                            <div className="form-group col-md-12">
                                <label>{"บริษัทฯ มีการปรับทุนประกันภัย สำหรับแผน UD 100, UD 150, UD 200 และ UD 250 และยกเลิกแผน UD 120 ส่วนแผน UD 60 และ UD 85 คงเดิม โดยให้มีผลตั้งแต่วันที่ 1 ต.ค. 2563 เป็นต้นไป สำหรับกรมธรรม์ที่คุ้มครองก่อน 1 ต.ค. 2563 ยังคงคุ้มครองตามเงื่อนไขและทุนประกันภัยเดิมจนสิ้นสุดความคุ้มครองตามกรมธรรม์"}</label>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12 divBtnRight">
                                    <button
                                        className="btn btn-secondary mt-4"
                                        type="button"
                                        onClick={closeModal}
                                    >
                                        <div className="d-flex justify-content-lg-center align-items-center">
                                            {"ปิด"}
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Modal>
                </div>
            </div>




            <div className="list-item" >
                <a className="item" href="#" onClick={openModal}>{"FAQ"}</a>
                <div>
                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >

                        <h2 ref={_subtitle => (subtitle = _subtitle)}>FAQ</h2>
                        <form className="modal-form">
                            <div className="form-group col-md-12">
                                <label>{"FAQ Detail"}</label>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12 divBtnRight">
                                    <button
                                        className="btn btn-secondary mt-4"
                                        type="button"
                                        onClick={closeModal}
                                    >
                                        <div className="d-flex justify-content-lg-center align-items-center">
                                            {"ปิด"}
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Modal>
                </div>
            </div>


            <div className="list-item" >
                <a className="item" href="#" onClick={openModal}>{"คำถาม-คำตอบ เกี่ยวกับการลงทะเบียน"}</a>
                <div>
                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >

                        <h2 ref={_subtitle => (subtitle = _subtitle)}>คำถาม-คำตอบ เกี่ยวกับการลงทะเบียน</h2>
                        <form className="modal-form">
                            <div className="form-group col-md-12">
                                <label>{"FAQ Detail"}</label>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12 divBtnRight">
                                    <button
                                        className="btn btn-secondary mt-4"
                                        type="button"
                                        onClick={closeModal}
                                    >
                                        <div className="d-flex justify-content-lg-center align-items-center">
                                            {"ปิด"}
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Modal>
                </div>
            </div>



            <div className="list-item" >
                <a className="item" href="#" onClick={openModal}>{"หมายเลขโทรศัพท์/อีเมลแอดเดรส ติดต่อเจ้าหน้าที่"}</a>
                <div>
                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >

                        <h2 ref={_subtitle => (subtitle = _subtitle)}>หมายเลขโทรศัพท์/อีเมลแอดเดรส ติดต่อเจ้าหน้าที่</h2>
                        <form className="modal-form">
                            <div className="form-group col-md-12">
                                <label>{"FAQ Detail"}</label>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12 divBtnRight">
                                    <button
                                        className="btn btn-secondary mt-4"
                                        type="button"
                                        onClick={closeModal}
                                    >
                                        <div className="d-flex justify-content-lg-center align-items-center">                                           
                                            {"ปิด"}
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </Modal>
                </div>
            </div> */}



        </form>
    )
}

export default HelpForm 

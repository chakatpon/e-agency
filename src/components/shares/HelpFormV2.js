import React, { Component } from 'react'

import { Accordion, Icon } from 'semantic-ui-react'
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FAQnon1 from '../../assets/img/FAQnon1.jpg'
import FAQnon2 from '../../assets/img/FAQnon2.jpg'
import FAQnon3 from '../../assets/img/FAQnon3.jpg'
import FAQnon4 from '../../assets/img/FAQnon4.jpg'

export default class AccordionHelpFluid extends Component {


  state = { activeIndex: 0 }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render() {
    const { activeIndex } = this.state

    return (

      <Accordion fluid styled>
        <Accordion.Title
          active={activeIndex === 1}
          index={1}
          onClick={this.handleClick}
          className="title-help"
        >
          <Icon name='dropdown' />
         FAQ
        </Accordion.Title>
        <Accordion.Content
          active={activeIndex === 1}
          className="content-help text-left"
        >

          <span className="span-help">
            <b>คำถาม : ปัญหาเกี่ยวกับโปรแกรมการพิมพ์ เช่น กดรูปเครื่องพิมพ์แล้ว ไม่แสดงรูปเครื่องพิมพ์</b>
          </span>
          <Typography component={'p'} variant={'body1'} >
            <span className="span-help">
              <b>คำตอบ : </b>
              กำหนดค่า Internet Explorer เลือกเมนู Tools - Internet Options - Security - Internet - Custom Level...
              ActiveX controls and plug-in คลิกเลือก "Enable - Automatic prompting for ActiveX controls"
              หรือ <a className="text-viriyah" target="_blank" href="http://webservices.viriyah.co.th/agency_new/content/CR10r2ActiveX1.msi">คลิกที่นี่</a> เพื่อติดตั้งโปรแกรม
          </span>
          </Typography>

          <br />
          <span className="span-help">
            <b>คำถาม : ปัญหาโปรแกรม Stock กรมธรรม์ หน้าคงเหลือ เรียกใช้แล้วแสดง Timeout expired.</b>
          </span>
          <Typography component={'p'} variant={'body1'} >
            <span className="span-help">
              <b>คำตอบ : </b>
              เนื่องจากโปรแกรมใช้เวลาในการประมวลผลข้อมูล ขณะนี้อยู่ระหว่างปรับปรุงโปรแกรม ผู้ใช้สามารถใช้ "รายงานการเบิกรมธรรม์" แสดงผลได้เช่นเดียวกันค่ะ
              สำหรับตัวแทนหลักที่ต้องการจ่าย Stock กรมธรรม์ปี 52 ( เลขที่เอกสาร 13 หลัก ) ให้บันทึกคืนกรมธรรม์ ปี 51 ในระบบให้หมดเสียก่อน
              จึงจะสามารถจ่ายกรมธรรม์ ปี 52 ให้ตัวแทนย่อยได้ โดยตรวจสอบรายการแบบสรุปที่รายงานการเบิกกรมธรรม์และแบบรายละเอียดที่รายงานการใช้กรมธรรม์ค่ะ
          </span>
          </Typography>

          <br />
          <span className="span-help">
            <b>คำถาม : รหัสไปรษณีย์ บนระบบ Web ไม่เหมือนกับ ระบบ Agency PC</b>
          </span>
          <Typography component={'p'} variant={'body1'} >
            <span className="span-help">
              <b>คำตอบ : </b>
              กรณีไม่ทราบรหัสไปรษณีย์ สามารถใส่เป็น "00000" หรือ "99999" เพื่อให้บันทึกข้อมูลได้นะคะ และเมื่อบันทึกข้อมูลโปรแกรมจะค้นหาและนำรหัสไปรษณีย์ ที่มีอยู่ในฐานข้อมูลมาใช้อัตโนมัติ
            </span>
          </Typography>

          <br />
          <span className="span-help">
            <b>คำถาม : กรณีไม่ทราบสีรถ บันทึกข้อมูลไม่ได้ ต้องทำอย่างไร</b>
          </span>
          <Typography component={'p'} variant={'body1'} >
            <span className="span-help">
              <b>คำตอบ : </b>
                กรณีไม่ทราบสีรถ สามารถระบุเป็นที่ว่างได้โดยเลือกให้ที่ข้อมูลลำดับสุดท้าย --ไม่ใช่ที่ลำดับแรก จะสามารถบันทึกข้อมูลได้ค่ะ การเลือกลักษณะนี้ เช่นเดียวกับ คำนำหน้าชื่อ และรหัสจังหวัดค่ะ
              </span>
          </Typography>
        </Accordion.Content>

        <Accordion.Title
          active={activeIndex === 2}
          index={2}
          onClick={this.handleClick}
          className="title-help"
        >
          <Icon name='dropdown' />
          คำถาม-คำตอบ เกี่ยวกับการลงทะเบียน
        </Accordion.Title>
        <Accordion.Content
          active={activeIndex === 2}
          className="content-help text-left"
        >
          <span className="span-help">
            <b>คำถาม : เงื่อนไขการลงทะเบียนขอล็อกอินเข้าใช้ระบบ e-Agency</b>
            <Typography component={'p'} variant={'body1'} >
              <span className="span-help">
                <b>คำตอบ : </b>
                มีเงื่อนไขดังนี้
              </span>
            </Typography>
            <Typography component={'p'} variant={'body1'} >
              <span className="span-help">
                1.ลงทะเบียนสำหรับตัวแทนที่มีรหัสตัวแทน 5 หลักกับบริษัทฯแล้วเท่านั้น
                </span>
            </Typography>
            <Typography component={'p'} variant={'body1'}>
              <span className="span-help">
                2.หากท่านยังไม่ได้แจ้งเลขบัตรประจำตัวประชาชน หรือเลขประจำตัวผู้เสียภาษี กรุณาติดต่อเจ้าหน้าที่ และเนื่องจากข้อมูลมีความสำคัญ กรุณาติดต่อกับเจ้าหน้าที่เพียง 2 ท่านนี้เท่านั้น
              </span>
            </Typography>
            <Typography component={'p'} variant={'body1'}>
              <span className="span-help">
                <FontAwesomeIcon icon="user-circle" /> คุณภัคจิรา มโนสมุทร pakjiram@viriyah.co.th โทรศัพท์ 0-2641-3500 ต่อ 7472 โทรสาร 02-200-7420
                </span>
            </Typography>
            <Typography component={'p'} variant={'body1'}>
              <span className="span-help">
                <FontAwesomeIcon icon="user-circle" /> คุณสุนิสา ฉันทสัมพันธ์ sunisac@viriyah.co.th โทรศัพท์ 0-2641-3500 ต่อ 7480 โทรสาร 02-200-7420
              </span>
            </Typography>
            <Typography component={'p'} variant={'body1'}>
              <span className="span-help">
                3.ตัวแทนที่ยังไม่มีอีเมลแอดเดรส สามารถสมัครอีเมลแอดเดรส @agency.viriyah.co.th ได้โดยไม่มีค่าใช้จ่าย
                <a className="text-viriyah" target="_blank" href="http://www.viriyah.co.th/agent/agent_email.asp"> (คลิกที่นี่เพื่อสมัครอีเมลสำหรับตัวแทนฯ)</a>
              </span>
            </Typography>
            <Typography component={'p'} variant={'body1'}>
              <span className="span-help">
                4.บริษัทฯขอสงวนสิทธิ์การอนุมัติ และการระงับการเข้าใช้ระบบ e-Agency ตามที่เห็นสมควร โดยไม่ต้องแจ้งให้ทราบล่วงหน้า
              </span>
            </Typography>
            <Typography component={'p'} variant={'body1'}>
              <span className="span-help">
                5.หากมีปัญหาในการลงทะเบียน กรุณากรอกแบบฟอร์มติดต่อเจ้าหน้าที่
              </span>
            </Typography>
          </span>

          <br />
          <span className="span-help">
            <b>คำถาม : วิธีลงทะเบียนเพื่อขอล็อกอินเข้าใช้ระบบ e-Agency ต้องทำอย่างไรบ้าง</b>
          </span>
          <Typography component={'p'} variant={'body1'} >
            <span className="span-help">
              <b>คำตอบ : </b>
              การทะเบียนเพื่อขอล็อกอินเข้าใช้ระบบ e-Agency สามารถทำได้ตามขั้นตอนดังนี้
            </span>
          </Typography>
          <Typography component={'p'} variant={'body1'} >
            <span className="span-help">
              1.กรอกแบบฟอร์มลงทะเบียน
            </span>
          </Typography>
          <Typography component={'p'} variant={'body1'}>
            <span className="span-help">
              2.เมื่อลงทะเบียนเสร็จ ระบบจะสร้าง username และ password ให้ทันที
            </span>
          </Typography>
          <Typography component={'p'} variant={'body1'}>
            <span className="span-help">
              3.คลิกเลือกไปที่หน้าจอ "ขออนุมัติสิทธิเข้าใช้ระบบงาน" หรือกลับไปหน้าแรก เพื่อเข้าสู่ระบบ e-Agency
            </span>
          </Typography>
          <Typography component={'p'} variant={'body1'}>
            <span className="span-help">
              4.ในกรณีที่ "ขออนุมัติสิทธิเข้าใช้ระบบงาน" เจ้าหน้าที่จะดำเนินการพิจารณาอนุมัติให้ภายใน 2 วันทำการ
            </span>
          </Typography>
        </Accordion.Content>

        {/* <Accordion.Title
          active={activeIndex === 3}
          index={3}
          onClick={this.handleClick}
          className="title-help"
        >
          <Icon name='dropdown' />
          คำถาม-คำตอบ เกี่ยวกับการใช้งานโปรแกรม e-Agency (Non-Motor)
        </Accordion.Title> */}
        {/* <Accordion.Content
          active={activeIndex === 3}
          className="content-help text-left"
        >
          <span className="span-help">
            <b>คำถาม : ระบบ e-Agency คืออะไร</b>
          </span>
          <Typography component={'p'} variant={'body1'} >
            <span className="span-help">
              <b>คำตอบ : </b>
              ระบบ e-Agency คือ
            </span>
          </Typography>
          <Typography component={'p'} variant={'body1'} >
            <span className="span-help">
              เว็บไซต์สำหรับตัวแทนของบริษัทวิริยะประกันภัย จำกัด ที่เปิดบริการให้ตัวแทนสามารถ บันทึกกรมธรรม์ สั่งพิมพ์ สร้างและจัดพิมพ์รายงานกรมธรรม์ต่าง ๆ ได้ด้วยตัวเอง โดยใช้งานจากที่ใดก็ได้ตามความสะดวกของตัวแทน ใช้เพียงอินเตอร์เน็ตและเว็บบราวเซอร์ (เช่น internet explorer)
            </span>
          </Typography>
          <Typography component={'p'} variant={'body1'}>
            <span className="span-help">
              * สำหรับการสั่งพิมพ์กรมธรรม์ (ลงหน้าตารางกรมธรรม์) จำเป็นต้องใช้เครื่องพิมพ์ชนิด dot matrix เท่านั้น
            </span>
          </Typography>
          <Typography component={'p'} variant={'body1'}>
            <span className="span-help">
              การเข้าใช้งานระบบ e-Agency สามารถทำได้โดยเปิดเว็บบราวเซอร์ไปที่ <a href="http://www.viriyah.co.th" target="_blank" className="text-viriyah">http://www.viriyah.co.th</a> แล้วคลิกที่ "e-Agency"
            </span>
          </Typography>

          <br /><br />
          <span className="span-help">
            <b>คำถาม : หากต้องการแก้ไขกรมธรรม์ที่ได้บันทึกไว้ก่อนหน้านี้ ต้องทำอย่างไร</b>
          </span>
          <Typography component={'p'} variant={'body1'} >
            <span className="span-help">
              <b>คำตอบ : </b>
              การแก้ไขกรมธรรม์ สามารถทำได้เฉพาะกรมธรรม์ที่บันทึกแล้วยังไม่ได้สั่งพิมพ์กรมธรรม์ (ลงแบบฟอร์ม) เท่านั้น โดยมีขั้นตอนดังนี้
            </span>
          </Typography>
          <Typography component={'p'} variant={'body1'} >
            <span className="span-help">
              1.ล็อกอินเข้าสู่ระบบ e-Agency
            </span>
          </Typography>
          <Typography component={'p'} variant={'body1'}>
            <span className="span-help">
              2.เข้าไปที่เมนู "บันทึกกรมธรรม์" (ดังรูป)
            </span>
          </Typography>
          <Typography component={'p'} variant={'body1'}>
            <img src={FAQnon1} />
          </Typography>
          <Typography component={'p'} variant={'body1'}>
            <span className="span-help">
              3.เลือกประเภทกรมธรรม์ที่ต้องการแก้ไข
            </span>
          </Typography>
          <Typography component={'p'} variant={'body1'}>
            <span className="span-help">
              4.ที่ขั้นตอนที่ 1 : คลิกที่ปุ่ม "ขั้นต่อไป"
            </span>
          </Typography>
          <Typography component={'p'} variant={'body1'}>
            <span className="span-help">
              5.ที่ขั้นตอนที่ 2 : ใส่เลข stock ของกรมธรรม์ที่ต้องการ (6 หลัก) แล้วคลิกที่ <FontAwesomeIcon icon="search" /> (ดังรูป)
            </span>
          </Typography>
          <Typography component={'p'} variant={'body1'}>
            <img src={FAQnon2} />
          </Typography>
          <Typography component={'p'} variant={'body1'}>
            <span className="span-help">
              6.หากพบกรมธรรม์ที่ต้องการ โปรแกรมจะดึงข้อมูลที่ท่านได้บันทึกไว้ขึ้นมา เพื่อการแก้ไข
            </span>
          </Typography>
          <Typography component={'p'} variant={'body1'}>
            <span className="span-help">
              7.แก้ไขข้อมูล จนครบขั้นตอนที่ 3 แล้วคลิกที่ปุ่ม "จัดเก็บข้อมูล" เพื่อเป็นการจบการแก้ไขกรมธรรม์
            </span>
          </Typography>

          <br /><br />
          <span className="span-help">
            <b>คำถาม : วิธีการตั้งหน้ากระดาษ เพื่อพิมพ์ตารางกรมธรรม์ ต้องทำอย่างไร</b>
          </span>
          <Typography component={'p'} variant={'body1'} >
            <span className="span-help">
              <b>คำตอบ : </b>
              การตั้งหน้ากระดาษก่อนสั่งพิมพ์กรมธรรม์ สามารถทำได้ตามขั้นตอนดังนี้
            </span>
          </Typography>
          <Typography component={'p'} variant={'body1'} >
            <span className="span-help">
              1.เปิดเว็บบราวเซอร์ (Internet Explorer) เรียกเมนู File <FontAwesomeIcon icon="angle-double-right" /> Page Setup... (ดังรูป)
            </span>
          </Typography>
          <Typography component={'p'} variant={'body1'}>
            <img src={FAQnon3} />
          </Typography>
          <Typography component={'p'} variant={'body1'}>
            <span className="span-help">
              2.ที่หน้าจอ Page Setup ให้แก้ไขค่า "Header" และ "Footer" และ Margins (inches) ให้เป็นดังรูป (Header, Footer เป็นค่าว่าง และ Margins ให้เป็นค่า 0) ดังรูป
            </span>
          </Typography>
          <Typography component={'p'} variant={'body1'}>
            <img src={FAQnon4} />
          </Typography>
          <Typography component={'p'} variant={'body1'}>
            <span className="span-help">
              3.คลิกที่ปุ่ม "OK" เพื่อเสร็จสิ้นการตั้งค่าหน้ากระดาษ
            </span>
          </Typography>
          <Typography component={'p'} variant={'body1'}>
            <span className="span-help">
              <b>หมายเหตุ: </b>ค่า Margins ของพรินเตอร์บางรุ่นอาจมีค่า Left, Right, Top และ Bottom ไม่เท่ากับ 0 ขึ้นอยู่กับข้อจำกัดของแต่ละรุ่น กรุณาสั่ง "พิมพ์ตรวจสอบ" ก่อนพิมพ์จริงลงหน้าตารางกรมธรรม์
            </span>
          </Typography>
        </Accordion.Content> */}

        <Accordion.Title
          active={activeIndex === 4}
          index={4}
          onClick={this.handleClick}
          className="title-help"
        >
          <Icon name='dropdown' />
          หมายเลขโทรศัพท์/อีเมลแอดเดรส ติดต่อเจ้าหน้าที่
        </Accordion.Title>
        <Accordion.Content
          active={activeIndex === 4}
          className="content-help text-left"
        >
          <span className="span-help">
            <b>ข้อมูลติดต่อเจ้าหน้าที่</b>
          </span>
          <Typography component={'p'} variant={'body1'} >
            <span className="span-help">
              1.เจ้าหน้าที่สารสนเทศสาขาฯ ของวิริยะประกันภัยที่ตัวแทนสังกัดอยู่
            </span>
          </Typography>
          <Typography component={'p'} variant={'body1'} >
            <span className="span-help">
              2.เจ้าหน้าที่ดูแลระบบ e-Agency
            </span>
          </Typography>
          <Typography component={'p'} variant={'body1'} >
            <span className="span-help">
              <FontAwesomeIcon icon="phone-square" /> โทรศัพท์ 0-2129-8090
            </span>
          </Typography>
          <Typography component={'p'} variant={'body1'} >
            <span className="span-help">
              <FontAwesomeIcon icon="envelope" /> อีเมลแอดเดรส eagency_admin@viriyah.co.th
            </span>
          </Typography>
        </Accordion.Content>
      </Accordion>

    )
  }
}
// const styleLink = document.createElement("link");
// styleLink.rel = "stylesheet";
// styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
// document.head.appendChild(styleLink);

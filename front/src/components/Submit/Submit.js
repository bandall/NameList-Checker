import { useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { postAddList } from "../functions";
import s from "./Submit.module.css";
function Submit() {
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [region, setRegion] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        if(start === "" || end === "") return alert("날짜를 입력해주세요.");
        if(name === "" || phoneNumber === "") return alert("이름 또는 전화번호를 작성해주세요.");
        const res = await postAddList(name, phoneNumber, region,start, end);
        if(res) {
            setName("");
            setPhoneNumber("");
            setRegion("");
        }
    }
    
    return (
        <div className={s.wrap_addlist}>
            <Card className={s.wrap_addlist_card}>
                <Card.Header>후원품 수령자 추가</Card.Header>
                <Form className={s.wrap_addlist_form}>
                    <Row className="mb-3">
                        <Form.Floating className="mb-3" style={{width: "50%"}}>
                        <Form.Control
                            id="floatingInputCustom"
                            type="date"
                            placeholder="YYYY-MM-DD"
                            onChange={e => setStart(e.target.value)}
                            required
                            min="1920-01-01"
                            max="2080-01-01"
                            />
                            <label htmlFor="floatingInputCustom">중복 검사 시작 일</label>
                        </Form.Floating>
                        <Form.Floating className="mb-3" style={{width: "50%"}}>
                        <Form.Control
                            id="floatingInputCustom"
                            type="date"
                            placeholder="YYYY-MM-DD"
                            onChange={e => setEnd(e.target.value)}
                            required
                            min="1920-01-01"
                            max="2080-01-01"
                            />
                            <label htmlFor="floatingInputCustom">중복 검사 시작일 종료 일</label>
                        </Form.Floating>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="inputUsername">
                            <Form.Label>유저 이름</Form.Label>
                            <Form.Control 
                                type="list_name" 
                                placeholder="이름"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3" controlId="formGridPhoneNumber">
                            <Form.Label>전화번호</Form.Label>
                            <Form.Control
                                type="list_phone"
                                placeholder="-없이 입력"
                                value={phoneNumber}
                                onChange={e => setPhoneNumber(e.target.value)}
                                required
                                pattern="[0-9]{11}"
                            />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3" controlId="inputRegion">
                            <Form.Label>지역</Form.Label>
                            <Form.Control
                                type="list_region"
                                placeholder="거주지역"
                                value={region}
                                onChange={e => setRegion(e.target.value)}
                                required
                            />
                        </Form.Group>
                    </Row>
                    <Button variant="primary" type="submit" style={{float:"right"}} onClick={onSubmit}>
                           추가
                    </Button>
                </Form>
            </Card>
        </div>
    )
}

export default Submit;
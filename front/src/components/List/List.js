import { useEffect, useState } from "react";
import { Alert, Form, Row, Table } from "react-bootstrap";
import { getList, postDeleteList } from "../functions";
import ListComponent from "./ListComponent";
import s from "./List.module.css"
function List({loggedIn}) {
    const [userDatas, setUserDatas] = useState([]);
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const setData = async () => {
        const result = await getList(start, end);
        if(!result) return;
        setUserDatas(result);
    }

    const deleteData = async (id) => {
        const result = await postDeleteList(id)
        if(result) {
            setUserDatas(userDatas.filter((data) => String(data._id) !== String(id)));
        }
    }

    useEffect(() => {
        if(loggedIn) setData();
    }, [start, end, loggedIn]);

    return (
        <div className={s.wrap_inner}>
            {
                !loggedIn ? null :
                <div>
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
                    <Alert key={'primary'} variant={'primary'}>
                        {start ==="" ? "2022-01-01" : start}부터 {end ==="" ? "2099-01-01" : end}까지 <strong>{userDatas.length}건</strong>
                    </Alert>
                    <Table hover className={s.table}>
                        <thead>
                            <tr>
                                <th className={s.table_name}>이름</th>
                                <th className={s.table_phone}>전화번호</th>
                                <th className={s.table_region}>지역</th>
                                <th className={s.table_date}>수령일</th>
            
                            </tr>
                        </thead>
                        <tbody>
                            {userDatas.map((data, index) => {
                                const createDate = new Date(data.date).toLocaleDateString();
                                return (
                                    <ListComponent 
                                        key={index}
                                        name={data.name}
                                        phoneNumber={data.phoneNumber}
                                        region={data.region}
                                        date={createDate}
                                        id={data._id}
                                        deleteData={deleteData}
                                        style={{"border-collapse":"inherit"}}
                                    />
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            }
        </div>
    )
}

export default List;
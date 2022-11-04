import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import s from "./Login.module.css";
function Login() {
    
    const onClick = async (event) => {
        alert("Click")
    }
    
    return(
        <div>
            <div className={s.Auth_form_container}>
                <ul>
                <form className={s.Auth_form}>
                    <div className={s.Auth_form_content}>
                    <h3 className={s.Auth_form_title}>로그인</h3>
                    
                    <div className="form-group mt-3">
                        {/* <label>Password</label> */}
                        <Form.Floating>
                            <Form.Control
                            id="current-password"
                            type="password"
                            onChange={onClick}
                            placeholder="Password"
                            required
                            />
                        <label htmlFor="floatingPasswordCustom">비밀번호</label>
                        </Form.Floating>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" onClick={onClick} className="btn btn-primary">
                            제출
                        </button>
                    </div>
                    </div>
                </form>
                </ul>
            </div>
        </div>
    )
}
export default Login;
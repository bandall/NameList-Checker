import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import s from "./Login.module.css";
import { postLoggin } from "../functions";
function Login({setLoggedIn}) {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    
    const onChange = (event) => {
        setPassword(event.target.value);
    }
    
    const onSubmit = async (event) => {
        event.preventDefault();
        const res = await postLoggin(password);
        if(res) {
            setLoggedIn(true);
            localStorage.setItem("loggedIn", "true");
            navigate("/");
        }
        
    }
    
    return(
        <div>
            <div className={s.Auth_form_container}>
                <ul>
                <form className={s.Auth_form}>
                    <div className={s.Auth_form_content}>
                    <h3 className={s.Auth_form_title}>로그인</h3>
                    <div className="form-group mt-3">
                        <Form.Floating>
                            <Form.Control
                            id="current-password"
                            type="password"
                            onChange={onChange}
                            placeholder="Password"
                            required
                            />
                        <label htmlFor="floatingPasswordCustom">비밀번호</label>
                        </Form.Floating>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" onClick={onSubmit} className="btn btn-primary">
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
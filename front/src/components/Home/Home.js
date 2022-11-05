import { useEffect } from "react";
import Search from "../Search/Search";
import Submit from "../Submit/Submit";

function Home({loggedIn}) {
    useEffect(() => {
    }, [])

    return (
      <div>
        {
            !loggedIn ? null :
            <div>
                <Submit/>
                <Search/>
            </div>
        }
      </div>
    )
}

export default Home;
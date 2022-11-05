
function ListComponent({index, name, phoneNumber, region, date, id, deleteData}) {

    const onClick = async () => {
        if(!window.confirm("[삭제 확인]\n이름: " + name.substr(0,6) + "\n전화번호: " + phoneNumber.substr(0,6) + "\n지역: " + region + "\n날짜: " + date)) {
			return;
		}
        deleteData(id)
    }

    return (
        <tr onClick={onClick}>
            <td>{name.substr(0,6)}</td>
            <td>{phoneNumber.substr(0,6)}</td>
            <td>{region}</td>
            <td>{date}</td>
        </tr>
    )
}

export default ListComponent
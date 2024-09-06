import { useEffect, useState } from "react"

export default function Form() {

    const [name, setName] = useState("");
    const [email, setemail] = useState("");
    const [pass, setPass] = useState("");
    const [studentData, setstudentData] = useState([]);

    const[editId,seteditId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, pass, email);

        if (!name || !email || !pass) {
            alert("Please enter all input fields.....!!!!!!")
            return;
        }

        if(editId){
            fetch(`http://localhost:8000/Students/${editId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: pass
                }),
            }).then(response => response.json())
                .then(data => {
                    fetchFun()
                    console.log("Data updated successfully", data)
                })
                .catch(() => console.log("Something is wrong"))
                seteditId(null);
        }
        else{
            fetch(' http://localhost:8000/Students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: pass
                }),
            }).then(response => response.json())
                .then(data => {
                    fetchFun()
                    console.log("Data added successfully", data)
                })
                .catch(() => console.log("Something is wrong"))
        }

        setName("");
        setPass("");
        setemail("");
    }

    const handleDelete = (id) => {
        console.log(id)
        fetch(`http://localhost:8000/Students/${id}`, {
            method: 'DELETE'
        })
            .then((res) => res.json())
            .then((data) => {
                // fetchFun()
                setstudentData(studentData.filter((item) => item.id != id))
                console.log("Data deleted successfully", data)
            })
            .catch((err) => { console.log("something is wrong", err) })

        // data deleted updated in UI without fetchFun

    }

    const handleEdit = (item) => {
        seteditId(item.id)
        setName(item.name)
        setemail(item.email)
        setPass(item.password)
    }

    const fetchFun = () => {
        fetch('  http://localhost:8000/Students')
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setstudentData(data)
            })
            .catch(() => { "something wrong" })
    }

    useEffect(() => {
        fetchFun();
    }, [])


    return (
        <div className="formname">
            <form className="form" onSubmit={handleSubmit}>

                <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} /> <br /><br />

                <input type="text" placeholder="Enter your email" value={email} onChange={(e) => setemail(e.target.value)} /> <br /><br />

                <input type="password" placeholder="Enter your password" value={pass} onChange={(e) => setPass(e.target.value)} /> <br /><br />

                <button>{editId ? "Update Data" : "Add Data"}</button>

            </form>

            <div>
                {
                    studentData.map((item) => {
                        return <div key={item.id} style={{ backgroundColor: "#FFB3CB", margin: "10px", padding: "10px", border: "1px solid black" }}>
                            <p>{`id : ${item.id}`}</p>
                            <h4 style={{ margin: "10px 0" }}>{`name : ${item.name}`}</h4>
                            <h5 style={{ margin: "0 0 10px 0" }}>{`email : ${item.email}`}</h5>
                            <p>{`password : ${item.password}`}</p>
                            <button className="editbtn" onClick={() => handleEdit(item)}>Edit</button>
                            <button className="deletebtn" onClick={() => handleDelete(item.id)}>DELETE</button>
                        </div>
                    })
                }

            </div>
        </div>

    )
}

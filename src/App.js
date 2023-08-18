import './App.css';
import { Button, List, Form } from 'antd'
import axios from 'axios'
import * as React from 'react'

const HOST = `${process.env.REACT_APP_API}:${process.env.REACT_APP_PORT}`

function App() {
  const [list, setList] = React.useState([])
  const [file, setFile] = React.useState();
  const [message, setMessage] = React.useState('');

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setMessage(e.target.value);
    }
  };

  React.useEffect(() => {
    axios.get(`${HOST}/list`).then(result => setList(result.data.files))
  }, [])


  function deleteFile(file) {
    axios.delete(`${HOST}/${file}`).then(() => {
      axios.get(`${HOST}/list`).then(result => setList(result.data.files))
    })
  }

  function handleUpload(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", file);
    axios
      .post(`${HOST}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-rapidapi-host": "file-upload8.p.rapidapi.com",
          "x-rapidapi-key": "your-rapidapi-key-here",
        },
      })
      .then(() => {
        // handle the response
        axios.get(`${HOST}/list`).then(result => setList(result.data.files))
        setMessage('');
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
  }

  return (
    <div className="App">
      <form onSubmit={handleUpload}>
        <input type='file' onChange={handleFileChange} value={message}/>
        <Button htmlType='submit' type="primary" disabled={!message}>Upload</Button>
      </form>
      {list?.map(item => <List.Item key={item}>
        <a href={`${HOST}/uploads/${item}`} target='_blank'>{item}</a>
        <Button onClick={() => deleteFile(item)}>Xoa</Button>
      </List.Item>)}
    </div>
  );
}

export default App;

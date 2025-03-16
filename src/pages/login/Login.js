import { Button, Select, TextField } from "@mui/material";
import { generateEncryptedCode } from "../../encryption";
import { useEffect, useState } from "react";
import AppHeader from "../../components/header/AppHeader";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [createAccount, setCreateAccount] = useState(false);

    const [teamList, setTeamList] = useState([]);
    const [createUsername, setCreateUsername] = useState('');
    const [createPassword, setCreatePassword] = useState('');
    const [createError, setCreateError] = useState('');
    const [selectedTeamId, setSelectedTeamId] = useState('');
    const [createCode, setCreateCode] = useState('');

    //store cred code in session storage
    //store admin in session storage
    const handleLogin = async () => {
        const cred_code = await generateEncryptedCode(username, password);
        fetch(`${sessionStorage.getItem('apiUrl')}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cred_code })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setError(data.error);
            }
            else {
                sessionStorage.setItem('cred_code', cred_code);
                sessionStorage.setItem('admin', data.admin);
                sessionStorage.setItem('name', data.name);
                sessionStorage.setItem('logo', data.logo);
                window.location.reload();
            }
        })
        .catch(error => console.error(error));
    };

    const handleCreateAccount = async () => {
        const cred_code = await generateEncryptedCode(createUsername, createPassword);
        fetch(`${sessionStorage.getItem('apiUrl')}/create_account`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cred_code, id: selectedTeamId, creation_code: createCode})
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setCreateError(data.error);
            }
            else {
                sessionStorage.setItem('cred_code', cred_code);
                sessionStorage.setItem('admin', data.admin);
                sessionStorage.setItem('name', data.name);
                sessionStorage.setItem('logo', data.logo);
                window.location.reload();
            }
        })
        .catch(error => console.error(error));
    };


    useEffect(() => {
        fetch(`${sessionStorage.getItem('apiUrl')}/get_players_no_cred_code`)
            .then(response => response.json())
            .then(data => setTeamList(data))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        if (createAccount) {
            setCreateUsername('');
            setCreatePassword('');
            setCreateError('');
        }
        else {
            setUsername('');
            setPassword('');
            setError('');
        }
    }, [createAccount]);

    return (<>
        {createAccount && <div className='app-home' style={{ gap: '20px' }}>
            <AppHeader />
            <h1 style={{marginTop: '80px', color: '#14083d'}}>Claim Account</h1>
            
            <Select 
                value={selectedTeamId}
                onChange={e => setSelectedTeamId(e.target.value)}
                style={{width: '200px'}}
                native
                label="Team"
            >
                <option value="">Select a Team</option>
                {teamList.map(team => <option key={team.id} value={team.id}>{team.name}</option>)}
            </Select>


            <TextField label="Username" value={createUsername} onChange={e => setCreateUsername(e.target.value)} />
            <TextField label="Password" type="password" value={createPassword} onChange={e => setCreatePassword(e.target.value)} />
            <TextField label="Creation Code" value={createCode} onChange={e => setCreateCode(e.target.value)} />
            {createError && <p style={{ color: 'red' }}>{createError}</p>}
            
            <Button variant="contained"
                disabled={!selectedTeamId || !createUsername || !createPassword || !createCode}
                onClick={() => handleCreateAccount()}
                sx={{ backgroundColor: '#14083d' }}>Claim Account</Button>
            
            <span>Can't select a team? Refresh the page!</span>
            
            
            <span onClick={() => setCreateAccount(false)} style={{ color: '#14083d', cursor: 'pointer' }}>Login</span>

        </div>}
        {!createAccount && <div className='app-home' style={{ gap: '20px' }}>
            <AppHeader />
            <h1 style={{marginTop: '80px', color: '#14083d'}}>Login</h1>
            <TextField label="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <Button variant="contained" onClick={handleLogin} sx={{ backgroundColor: '#14083d' }}>Login</Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* create account link */}
            <span onClick={() => setCreateAccount(true)} style={{ color: '#14083d', cursor: 'pointer' }}>Claim Account</span>   
        </div>}
    </>);
}
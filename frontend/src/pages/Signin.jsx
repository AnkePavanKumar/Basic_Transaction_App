import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/user/signin', { username: email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error:', error);
            if (error.response && (error.response.status === 400 || error.response.status === 401)) {
                setError('Invalid email or password.');
            } else {
                setError('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label="Sign in" />
                    <SubHeading label="Enter your credentials to access your account" />
                    {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                    <InputBox
                        placeholder="your@gmail.com"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputBox
                        placeholder="123456"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="pt-4">
                        <Button label="Sign in" onClick={handleSignin} />
                    </div>
                    <BottomWarning label="Don't have an account?" buttonText="Sign up" to="/signup" />
                </div>
            </div>
        </div>
    );
};

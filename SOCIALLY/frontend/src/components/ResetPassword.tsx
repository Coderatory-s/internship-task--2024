
import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ResetPassword = () => {
    const [email, setEmail] = useState('');

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/v1/users/reset-password', { email });
            alert('Password reset email sent');
        } catch (error) {
            console.error('Reset failed:', error);
        }
    };

    return (
        <form onSubmit={handleReset} className="flex flex-col space-y-4">
            <Input 
                type="email" 
                placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="border rounded-lg p-2" 
            />
            <Button type="submit" className="bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition">
                Send Reset Email
            </Button>
        </form>
    );
};

export default ResetPassword;

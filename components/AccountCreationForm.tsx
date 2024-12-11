    // components/AccountCreationForm.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AccountCreationFormProps {
  onCreateAccount: (data: { firstName: string; lastName: string; email: string; password: string; role: string }) => void;
  roles?: string[];
}

const AccountCreationForm: React.FC<AccountCreationFormProps> = ({ onCreateAccount, roles = ['admin', 'user', 'manager'] }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName]   = useState('');
  const [email, setEmail]         = useState('');
  const [password, setPassword]   = useState('');
  const [role, setRole]           = useState('user');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateAccount({ firstName, lastName, email, password, role });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-md shadow">
      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="role">Role</Label>
        <select 
          id="role" 
          value={role} 
          onChange={(e) => setRole(e.target.value)} 
          className="border border-gray-300 rounded p-2 w-full"
        >
          {roles.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>
      <Button type="submit" variant="default">Create Account</Button>
    </form>
  );
};

export default AccountCreationForm;

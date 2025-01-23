import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface AccountCreationFormProps {
  onCreateAccount: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    team: string;
  }) => void;
  roles?: string[];
  teams?: string[];
}

const AccountCreationForm: React.FC<AccountCreationFormProps> = ({
  onCreateAccount,
  roles = ["Beheerder", "Werknemer", "Manager"],
  teams = ["ICT", "Financier", "HRM"],
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Werknemer");
  const [team, setTeam] = useState("ICT");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateAccount({ firstName, lastName, email, password, role, team });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-md shadow"
    >
      <div>
        <Label htmlFor="firstName">Voornaam</Label>
        <Input
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="lastName">Achternaam</Label>
        <Input
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Wachtwoord</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="role">Rol</Label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        >
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="team">Team</Label>
        <select
          id="team"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        >
          {teams.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
      <Button type="submit" variant="default">
        Account aanmaken
      </Button>
    </form>
  );
};

export default AccountCreationForm;

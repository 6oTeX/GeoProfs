interface DayOverviewProps {
  date: Date;
  leaveNames: string[];
  sickNames: string[];
}

const DayOverview: React.FC<DayOverviewProps> = ({
  date,
  leaveNames,
  sickNames,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Dag overzicht</h2>
        <span className="text-gray-600">
          {date.toLocaleDateString("NL", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="text-left text-red-600">Verlof</th>
            <th className="text-left text-yellow-500">Ziek</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {leaveNames.length > 0 ? (
                <ul>
                  {leaveNames.map((name, index) => (
                    <li key={index}>{name}</li>
                  ))}
                </ul>
              ) : (
                <p>Geen</p>
              )}
            </td>
            <td>
              {sickNames.length > 0 ? (
                <ul>
                  {sickNames.map((name, index) => (
                    <li key={index}>{name}</li>
                  ))}
                </ul>
              ) : (
                <p>Geen</p>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DayOverview;

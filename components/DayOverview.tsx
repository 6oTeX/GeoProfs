interface DayOverviewProps {
  date: Date;
  verlofNames: string[];
  ziekNames: string[];
}

const DayOverview: React.FC<DayOverviewProps> = ({
  date,
  verlofNames,
  ziekNames,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Dag overzicht</h2>
        <span className="text-gray-600">
          {date.toLocaleDateString('default', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
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
              {verlofNames.length > 0 ? (
                <ul>
                  {verlofNames.map((name, index) => (
                    <li key={index}>{name}</li>
                  ))}
                </ul>
              ) : (
                <p>Geen</p>
              )}
            </td>
            <td>
              {ziekNames.length > 0 ? (
                <ul>
                  {ziekNames.map((name, index) => (
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

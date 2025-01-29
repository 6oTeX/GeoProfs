interface DayOverviewProps {
  date: Date;
  furloughNames: string[];
  sickNames: string[];
}

const DayOverview: React.FC<DayOverviewProps> = ({
  date,
  furloughNames,
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
            <th className="text-left text-red-600">Afwezig</th>
            <th className="text-left text-yellow-500">Aangevraagd</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {furloughNames.length > 0 ? (
                <ul>
                  {furloughNames.map((name, index) => (
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

import { TableHTMLProps } from './table';

const HtmlTable = (props: TableHTMLProps) => {
  const {
    headCells, rows, title, uniqueKey,
  } = props;
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>{title}</h2>
      <table style={{ border: '1px solid black' }}>
        <thead>
          <tr>
            {headCells.map((headCell) => (
              <td style={{ border: '1px solid black' }} key={headCell.id}>
                {headCell.label}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row: any) => (
            <tr key={row[uniqueKey]}>
              {headCells.map((headCell) => (
                <td style={{ border: '1px solid black' }} key={headCell.id}>
                  {headCell.cell ? headCell.cell(row) : row[headCell.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HtmlTable;

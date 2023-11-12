import { Table, Progress, CellProps } from 'rsuite';
import { Participant } from '../../../App';
import ExternalLinkIcon from '../../icons/ExternalLinkIcon';
import './index.css';

const { Column, HeaderCell, Cell } = Table;

const ImageCell: React.FC<CellProps> = ({ rowData, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div
      style={{
        width: 40,
        height: 40,
        background: '#f5f5f5',
        borderRadius: 6,
        marginTop: 2,
        overflow: 'hidden',
        display: 'inline-block'
      }}
    >
      <img src={rowData.avatar} width="40" />
    </div>
  </Cell>
);

const MoneyCell: React.FC<CellProps> = ({ rowData, dataKey, ...props }) => {
  if (!dataKey || rowData[dataKey] === undefined) return null;

  return (
    <Cell {...props}>
      {rowData[dataKey] / 100} грн
    </Cell>
  );
};

const LinkCell = ({ rowData, dataKey, ...props }: CellProps) => {
  if (!dataKey || !rowData[dataKey]) return null;

  return (
    <Cell {...props}>
      <a href={rowData[dataKey]} target="_blank" rel="noreferrer">Перейти <ExternalLinkIcon /></a>
    </Cell>
  );
};

const ParticipantsTable: React.FC<{ participants: Participant[], loading: boolean }> = ({ participants, loading }) => (
  <Table height={300} data={participants} className="participants-table" autoHeight={true} loading={loading}>
    <Column width={80} align="center" fixed>
      <HeaderCell>Аватар</HeaderCell>
      <ImageCell dataKey="avatar" />
    </Column>

    <Column flexGrow={1} minWidth={200}>
      <HeaderCell>Імʼя</HeaderCell>
      <Cell dataKey="ownerFullName" />
    </Column>

    <Column flexGrow={1} minWidth={160}>
      <HeaderCell>Збирає</HeaderCell>
      <Cell dataKey="ownerName" />
    </Column>

    <Column flexGrow={1} minWidth={250}>
      <HeaderCell>Прогрес</HeaderCell>
      <Cell>
        {rowData => {
          const percent = ((rowData as Participant).jarAmount / (rowData as Participant).jarGoal) * 100;
          return (
            <div>
              <Progress.Line style={{ padding: 0 }}
                percent={+percent.toFixed(2)}
                status={(rowData as Participant).jarStatus === "CLOSED" ? 'success' : 'active'}
              />
            </div>
          );
        }}
      </Cell>
    </Column>

    <Column flexGrow={1} minWidth={100}>
      <HeaderCell>Зібрали</HeaderCell>
      <MoneyCell dataKey="jarAmount" />
    </Column>

    <Column flexGrow={1} minWidth={100}>
      <HeaderCell>Ціль</HeaderCell>
      <MoneyCell dataKey="jarGoal" />
    </Column>

    <Column flexGrow={1} fullText={true} minWidth={140} align='center'>
      <HeaderCell>Посилання на банку</HeaderCell>
      <LinkCell dataKey="jarLink" />
    </Column>
  </Table>
);

export default ParticipantsTable;

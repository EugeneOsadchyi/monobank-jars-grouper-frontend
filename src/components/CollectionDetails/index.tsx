import { Progress } from 'rsuite';
import './index.css';

interface CollectionDetailsProps {
  responsible: string;
  initialGoal: number;
  actualGoal: number;
  actualAmount: number;
}

const CollectionDetails: React.FC<CollectionDetailsProps> = ({
  responsible,
  initialGoal,
  actualGoal,
  actualAmount
}) => {
  return (
    <header className="CollectionDetails">
      <div>
        <img src="https://ava-img.monobank.com.ua/NqJAEHONJZ4lEaerJztWuzcpw-3pLVOHQ1hMmQIQlR4=.jpg" width="100" />
      </div>
      <div>
        <dl>
          <dt>Відповідальна особа:</dt>
          <dd>{responsible}</dd>
          <dt>Загальна ціль:</dt>
          <dd>{initialGoal / 100} грн</dd>
          <dt>Поточна ціль:</dt>
          <dd>{actualGoal / 100} грн</dd>
          <dt>Всього зібрано:</dt>
          <dd>{actualAmount / 100} грн</dd>
        </dl>
      </div>
      <div>
        <div style={{ width: 100 }}>
          <Progress.Circle percent={+((actualAmount / initialGoal) * 100).toFixed(2)} />
        </div>
      </div>
    </header>
  );
}

export default CollectionDetails;

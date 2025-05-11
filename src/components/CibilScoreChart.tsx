
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

interface ScoreHistoryPoint {
  month: string;
  score: number;
}

interface CibilScoreChartProps {
  scoreHistory: ScoreHistoryPoint[];
}

const CibilScoreChart = ({ scoreHistory }: CibilScoreChartProps) => {
  // Find min and max scores for chart scaling
  const scores = scoreHistory.map(item => item.score);
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);
  
  // Set domain with some padding
  const yAxisMin = Math.max(300, Math.floor((minScore - 20) / 10) * 10);
  const yAxisMax = Math.min(900, Math.ceil((maxScore + 20) / 10) * 10);

  // Define score range boundaries
  const excellentScore = 750;
  const goodScore = 700;
  const fairScore = 650;
  const poorScore = 600;

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={scoreHistory}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12 }} 
            padding={{ left: 10, right: 10 }} 
          />
          <YAxis 
            domain={[yAxisMin, yAxisMax]} 
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            formatter={(value) => [`${value}`, 'Credit Score']}
            labelFormatter={(label) => `Month: ${label}`}
            contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem' }}
          />
          
          {/* Reference lines for score ranges */}
          <ReferenceLine 
            y={excellentScore} 
            stroke="green" 
            strokeDasharray="3 3" 
            label={{ 
              value: 'Excellent', 
              position: 'left', 
              fill: 'green',
              fontSize: 10
            }} 
          />
          <ReferenceLine 
            y={goodScore} 
            stroke="blue" 
            strokeDasharray="3 3" 
            label={{ 
              value: 'Good', 
              position: 'left', 
              fill: 'blue',
              fontSize: 10
            }} 
          />
          <ReferenceLine 
            y={fairScore} 
            stroke="orange" 
            strokeDasharray="3 3" 
            label={{ 
              value: 'Fair', 
              position: 'left', 
              fill: 'orange',
              fontSize: 10
            }} 
          />
          <ReferenceLine 
            y={poorScore} 
            stroke="red" 
            strokeDasharray="3 3" 
            label={{ 
              value: 'Poor', 
              position: 'left', 
              fill: 'red',
              fontSize: 10
            }} 
          />
          
          <Line
            type="monotone"
            dataKey="score"
            stroke="#3B82F6"
            strokeWidth={2}
            activeDot={{ r: 8 }}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CibilScoreChart;

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useMemo } from 'react';
import { IResponseBrief } from '@/types/brief.types';

type StatisticProps = {
  briefs: IResponseBrief[];
};

export const Statistic = ({ briefs }: StatisticProps) => {
  const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
    arr.reduce(
      (groups, item) => {
        (groups[key(item)] ||= []).push(item);
        return groups;
      },
      {} as Record<K, T[]>,
    );

  const briefsData = useMemo(() => {
    const dates = briefs
      .filter((el) => !!el.doneDate)
      .map((el) => new Date(Date.parse(el.doneDate ?? '')));

    const datesRecord = groupBy(dates, (el) => el.toLocaleDateString());

    return Object.entries(datesRecord).map((el) => ({
      date: el[0],
      count: el[1].length,
    }));
  }, [briefs]);

  return (
    <ResponsiveContainer>
      <LineChart data={briefsData}>
        <XAxis
          dataKey='date'
          tickCount={6}
          tickLine={false}
          tickSize={10}
          tickMargin={10}
          axisLine={false}
          tick={{
            fontSize: '12px',
          }}
        />
        <YAxis
          dataKey='count'
          tickCount={3}
          axisLine={false}
          tickSize={10}
          tickLine={false}
          width={32}
          tickMargin={10}
          tick={{
            fontSize: '12px',
          }}
        />
        <Tooltip
          labelFormatter={(date) => `Дата: ${date}`}
          formatter={(count, name) => [count, 'Кол-во']}
          labelStyle={{
            fontWeight: 500,
            textAlign: 'center',
          }}
          itemStyle={{
            fontSize: 14,
            color: 'black',
          }}
        />
        <Line
          type='linear'
          dot={{ stroke: '#DF2020', strokeWidth: 2 }}
          stroke='#D9D9D9'
          dataKey='count'
          activeDot={{
            stroke: '#ff7171',
            fill: '#DF2020',
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

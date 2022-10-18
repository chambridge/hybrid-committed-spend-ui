import { Report } from 'api/reports/report';
import React from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ChartDatum } from 'routes/components/charts/common';
import { TrendChart } from 'routes/components/charts/trend';

import { chartStyles } from './CommittedSpendTrendChart.styles';

interface CommittedSpendTrendChartOwnProps {
  chartName?: string;
  currentData?: ChartDatum;
  thresholdData?: Report;
}

export type CommittedSpendTrendChartProps = CommittedSpendTrendChartOwnProps &
  RouteComponentProps<void> &
  WrappedComponentProps;

const CommittedSpendTrendChartBase: React.FC<CommittedSpendTrendChartProps> = ({
  chartName,
  currentData,
  thresholdData,
}) => {
  return (
    <TrendChart
      adjustContainerHeight
      containerHeight={chartStyles.chartContainerHeight}
      currentData={currentData}
      height={chartStyles.chartHeight}
      name={chartName}
      thresholdData={thresholdData}
    />
  );
};

export const CommittedSpendTrendChart = injectIntl(withRouter(CommittedSpendTrendChartBase));
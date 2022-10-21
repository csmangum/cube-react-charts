import { useCubeQuery } from "@cubejs-client/react";
import { Grid } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js 2',
    },
  },
};



const ChartLineChart = () => {
  const { resultSet, isLoading, error, progress } = useCubeQuery({
    measures: ["SimulationResults.DooderCount"],
    dimensions: ["SimulationResults.CycleNumber"],
    order: [["SimulationResults.CycleNumber", "asc"]],
  });
  if (isLoading) {
    return (
      <div>
        {(progress && progress.stage && progress.stage.stage) || "Loading..."}
      </div>
    );
  }

  if (error) {
    return <div>{error.toString()}</div>;
  }

  if (!resultSet) {
    return null;
  }

  const data = {
    labels: resultSet.series()[0].series.map((s) => s.x),
    datasets: [
      {
        label: 'DooderCount',
        data: resultSet.series()[0].series.map((s) => s.value),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div>
      <Grid alignItems="center" container spacing={0} display="flex" justifyContent="center" direction="column">
      <Grid item width="50%">
      <Line options={options} data={data} />;
      </Grid>
      </Grid>
    </div>
  );
};

export default ChartLineChart;
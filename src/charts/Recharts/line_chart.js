import { useCubeQuery } from "@cubejs-client/react";
import {
  XAxis,
  CartesianGrid,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { Grid } from "@mui/material";

const RechartLineChart = () => {
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

  return (
      <Grid alignItems="center" container spacing={0} display="flex" justifyContent="center" direction="column">
      <ResponsiveContainer width="50%" height={350}>
        <LineChart data={resultSet.series()[0].series}>
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="x"></XAxis>
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Line name="DooderCount" dataKey="value" fill="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      </Grid>
  );
};

export default RechartLineChart;
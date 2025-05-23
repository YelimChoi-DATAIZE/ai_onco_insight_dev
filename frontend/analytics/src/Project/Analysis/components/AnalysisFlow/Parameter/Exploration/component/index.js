import React, { useEffect, useState } from 'react';
// import { RadioGroup, FormControlLabel, Radio, Typography, Button, Box } from '@mui/material';
import {
  Box,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  Paper,
  Typography,
  FormControlLabel,
  FormGroup,
  TextField,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  Radio,
} from '@mui/material';

function not(a, b) {
  return a.filter((value) => !b.includes(value));
}

function intersection(a, b) {
  return a.filter((value) => b.includes(value));
}

export const SelectVariable = ({ columnDefs = [], alignment, onChange }) => {
  const fields = columnDefs.map((col) => col.field);

  const [checked, setChecked] = useState([]);
  const [top, setTop] = useState(fields);
  const [bottom, setBottom] = useState(alignment ? [alignment] : []);

  useEffect(() => {
    if (alignment && !bottom.includes(alignment)) {
      setBottom([alignment]);
    }
  }, [alignment]);

  useEffect(() => {
    if (onChange) {
      onChange({ target: { value: bottom[0] || '' } });
    }
  }, [bottom]);

  const topChecked = intersection(checked, top);
  const bottomChecked = intersection(checked, bottom);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCheckedDown = () => {
    setBottom([...bottom, ...topChecked.slice(0, 1)]);
    setTop(not(top, topChecked));
    setChecked(not(checked, topChecked));
  };

  const handleCheckedUp = () => {
    setTop([...top, ...bottomChecked]);
    setBottom(not(bottom, bottomChecked));
    setChecked(not(checked, bottomChecked));
  };

  const customList = (items) => (
    <Paper
      sx={{ width: 300, height: 200, overflow: 'auto', border: '1px solid #ddd' }}
      elevation={0}
    >
      <List dense component="div" role="list">
        {(Array.isArray(items) ? items : []).map((field) => {
          const labelId = `transfer-list-item-${field}-label`;
          return (
            <ListItemButton key={field} role="listitem" onClick={handleToggle(field)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.includes(field)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={field}
                primaryTypographyProps={{
                  fontFamily: 'Quicksand',
                  fontSize: 13,
                  fontWeight: 400,
                  color: '#333',
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <>
      <Grid container direction="column" spacing={1} alignItems="center">
        <Grid item>{customList(top)}</Grid>

        <Grid item>
          <Grid container direction="row" spacing={1} justifyContent="center">
            <Grid item>
              <Button
                variant="outlined"
                size="small"
                onClick={handleCheckedDown}
                disabled={topChecked.length === 0}
              >
                ↓
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                size="small"
                onClick={handleCheckedUp}
                disabled={bottomChecked.length === 0}
              >
                ↑
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>{customList(bottom)}</Grid>
      </Grid>
    </>
  );
};

export function StatOptionPanel({ options, setOptions }) {
  const handleCheckboxChange = (group, key) => (e) => {
    setOptions({
      ...options,
      [group]: {
        ...options[group],
        [key]: e.target.checked,
      },
    });
  };

  const handleInputChange = (group, key) => (e) => {
    setOptions({
      ...options,
      [group]: {
        ...options[group],
        [key]: e.target.value,
      },
    });
  };

  const renderGroup = (title, children) => (
    <Grid item xs={12}>
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            fontFamily="Quicksand"
            sx={{ mb: 1, fontSize: 13 }}
          >
            {title}
          </Typography>
          {children}
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Grid container spacing={1} sx={{ px: 1 }}>
      {renderGroup(
        'Sample Size',
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.sample.size}
                onChange={handleCheckboxChange('sample', 'size')}
              />
            }
            label={<Typography fontSize={12}>N</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.sample.missing}
                onChange={handleCheckboxChange('sample', 'missing')}
              />
            }
            label={<Typography fontSize={12}>Missing</Typography>}
          />
        </FormGroup>
      )}

      {renderGroup(
        'Percentile',
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.percentile.absolute}
                onChange={handleCheckboxChange('percentile', 'absolute')}
              />
            }
            label={<Typography fontSize={12}>Trim</Typography>}
          />
          <TextField
            size="small"
            variant="standard"
            type="number"
            value={options.percentile.absoluteValue}
            onChange={handleInputChange('percentile', 'absoluteValue')}
            sx={{ mx: 1, width: 60 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.percentile.set}
                onChange={handleCheckboxChange('percentile', 'set')}
              />
            }
            label={<Typography fontSize={12}>Percentiles</Typography>}
          />
          <TextField
            size="small"
            variant="standard"
            value={options.percentile.setValue}
            onChange={handleInputChange('percentile', 'setValue')}
            sx={{ mx: 1, width: 80 }}
          />
        </FormGroup>
      )}

      {renderGroup(
        'Central Tendency',
        <FormGroup row>
          {['Mean', 'Median', 'Mode', 'Sum'].map((label) => (
            <FormControlLabel
              key={label}
              control={
                <Checkbox
                  size="small"
                  checked={options.central[label]}
                  onChange={handleCheckboxChange('central', label)}
                />
              }
              label={<Typography fontSize={12}>{label}</Typography>}
            />
          ))}
        </FormGroup>
      )}

      {renderGroup(
        'Dispersion',
        <FormGroup row>
          {['SD', 'Variance', 'Range', 'Min', 'Max', 'IQR'].map((label) => (
            <FormControlLabel
              key={label}
              control={
                <Checkbox
                  size="small"
                  checked={options.dispersion[label]}
                  onChange={handleCheckboxChange('dispersion', label)}
                />
              }
              label={<Typography fontSize={12}>{label}</Typography>}
            />
          ))}
        </FormGroup>
      )}

      {renderGroup(
        'Mean Error',
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.mean.stdError}
                onChange={handleCheckboxChange('mean', 'stdError')}
              />
            }
            label={<Typography fontSize={12}>Standard Error</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.mean.confidence}
                onChange={handleCheckboxChange('mean', 'confidence')}
              />
            }
            label={<Typography fontSize={12}>Confidence Interval</Typography>}
          />
          <TextField
            size="small"
            variant="standard"
            type="number"
            value={options.mean.confidenceLevel}
            onChange={handleInputChange('mean', 'confidenceLevel')}
            sx={{ mx: 1, width: 60 }}
            InputProps={{ endAdornment: <span>%</span> }}
          />
        </FormGroup>
      )}

      {renderGroup(
        'Distribution',
        <FormGroup row>
          {['Skewness', 'Kurtosis'].map((label) => (
            <FormControlLabel
              key={label}
              control={
                <Checkbox
                  size="small"
                  checked={options.shape[label]}
                  onChange={handleCheckboxChange('shape', label)}
                />
              }
              label={<Typography fontSize={12}>{label}</Typography>}
            />
          ))}
        </FormGroup>
      )}

      {renderGroup(
        'Normality',
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.normality.test}
                onChange={handleCheckboxChange('normality', 'test')}
              />
            }
            label={<Typography fontSize={12}>Shapiro-Wilk</Typography>}
          />
        </FormGroup>
      )}

      {renderGroup(
        'Outlier',
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.outlier.extreme}
                onChange={handleCheckboxChange('outlier', 'extreme')}
              />
            }
            label={<Typography fontSize={12}>Extreme</Typography>}
          />
          <TextField
            size="small"
            variant="standard"
            type="number"
            value={options.outlier.extremeValue}
            onChange={handleInputChange('outlier', 'extremeValue')}
            sx={{ mx: 1, width: 60 }}
            InputProps={{ endAdornment: <span>values</span> }}
          />
        </FormGroup>
      )}
    </Grid>
  );
}

export function Statistic() {
  const [options, setOptions] = useState({
    sample: { size: true, missing: false },
    percentile: { absolute: false, absoluteValue: 4, set: false, setValue: '25,50,75' },
    central: { 평균: true, 중앙값: true, 최빈값: false, 합계: false },
    dispersion: {
      표준편차: true,
      분산: false,
      범위: false,
      최소값: false,
      최대값: true,
      사분범위: false,
    },
    mean: { stdError: false, confidence: false, confidenceLevel: 95 },
    shape: { 왜도: false, 첨도: false },
    normality: { test: false },
    outlier: { extreme: false, extremeValue: 5 },
  });

  return <StatOptionPanel options={options} setOptions={setOptions} />;
}

export function Plot() {
  const [plotOptions, setPlotOptions] = useState({
    histogram: { enabled: false, density: false },
    boxplot: {
      enabled: false,
      labelOutlier: false,
      violin: false,
      data: false,
      jitter: '',
    },
    barplot: { enabled: false },
    qqplot: { enabled: false },
  });

  return (
    <Box sx={{ p: 3 }}>
      <StatPlotOptionPanel options={plotOptions} setOptions={setPlotOptions} />
    </Box>
  );
}

export function StatPlotOptionPanel({ options, setOptions }) {
  const handleCheckboxChange = (group, key) => (e) => {
    setOptions({
      ...options,
      [group]: {
        ...options[group],
        [key]: e.target.checked,
      },
    });
  };

  const handleInputChange = (group, key) => (e) => {
    setOptions({
      ...options,
      [group]: {
        ...options[group],
        [key]: e.target.value,
      },
    });
  };

  const renderGroup = (title, children) => (
    <Grid item xs={12}>
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            fontFamily="Quicksand"
            sx={{ mb: 1, fontSize: 13 }}
          >
            {title}
          </Typography>
          {children}
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Grid container spacing={1} direction="column" sx={{ px: 1 }}>
      {renderGroup(
        'Histogram',
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.histogram.enabled}
                onChange={handleCheckboxChange('histogram', 'enabled')}
              />
            }
            label={<Typography fontSize={12}>Histogram</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.histogram.density}
                onChange={handleCheckboxChange('histogram', 'density')}
              />
            }
            label={<Typography fontSize={12}>Density</Typography>}
          />
        </FormGroup>
      )}

      {renderGroup(
        'Box Plot',
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.boxplot.enabled}
                onChange={handleCheckboxChange('boxplot', 'enabled')}
              />
            }
            label={<Typography fontSize={12}>Box Plot</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.boxplot.labelOutlier}
                onChange={handleCheckboxChange('boxplot', 'labelOutlier')}
              />
            }
            label={<Typography fontSize={12}>Label Outlier</Typography>}
            disabled={!options.boxplot.enabled}
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.boxplot.violin}
                onChange={handleCheckboxChange('boxplot', 'violin')}
              />
            }
            label={<Typography fontSize={12}>Violin</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.boxplot.data}
                onChange={handleCheckboxChange('boxplot', 'data')}
              />
            }
            label={<Typography fontSize={12}>Data</Typography>}
          />
          <Select
            size="small"
            variant="standard"
            value={options.boxplot.jitter || ''}
            onChange={handleInputChange('boxplot', 'jitter')}
            displayEmpty
            disabled={!options.boxplot.data}
            sx={{ fontSize: 12, mt: 1 }}
          >
            <MenuItem value="" disabled>
              Jitter
            </MenuItem>
            <MenuItem value="uniform">Uniform</MenuItem>
            <MenuItem value="normal">Normal</MenuItem>
          </Select>
        </FormGroup>
      )}

      {renderGroup(
        'Bar Plot',
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.barplot.enabled}
                onChange={handleCheckboxChange('barplot', 'enabled')}
              />
            }
            label={<Typography fontSize={12}>Bar Plot</Typography>}
          />
        </FormGroup>
      )}

      {renderGroup(
        'Q-Q Plot',
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={options.qqplot.enabled}
                onChange={handleCheckboxChange('qqplot', 'enabled')}
              />
            }
            label={<Typography fontSize={12}>Q-Q</Typography>}
          />
        </FormGroup>
      )}
    </Grid>
  );
}

export const RunAnalysis = ({ onRunHistogram }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button onClick={onRunHistogram} sx={{ backgroundColor: '#2F72B9', color: '#fff' }}>
        Run Histogram
      </Button>
    </Box>
  );
};
